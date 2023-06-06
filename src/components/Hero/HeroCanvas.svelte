<script lang="ts">
  import { Canvas, T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import type { Mesh } from "three";
  import { injectLookAtPlugin } from "~/utils/plugins";
  import BackDrop from "./three/BackDrop.svelte";
  import Lines from "./three/Lines.svelte";
  import Sprites from "./three/Sprites.svelte";

  injectLookAtPlugin();

  export let heroInfo: HeroInfo;
  export let getSrc: (src: SanityImageSource) => string;

  function getAssetSrc(name: string) {
    const src = heroInfo.assets.find((asset) =>
      asset.name.includes(name)
    ).thumbnail;
    return getSrc(src);
  }

  let innerWidth;
  const groupPos = (innerWidth, outerHeight?) => {
    if (innerWidth <= 992) {
      return {
        position: [-2.5, 4, -20 + 0 - 10 * (innerWidth / 3200)],
      };
    }
    return {
      position: [
        -5 + 20 * (innerWidth / 3200),
        -2,
        -10 + 25 * (innerWidth / 3200),
      ],
    };
  };

  const fade = (duration = 400, delay = 100) =>
    createTransition<Mesh>((ref) => {
      ref.material.transparent = true;
      return {
        tick(t) {
          // t is [0,1]
          ref.material.opacity = t;
        },
        easing: cubicOut,
        duration,
        delay,
      };
    });
</script>

<svelte:window bind:innerWidth />

<div class="canvas">
  <Canvas frameloop="demand" rendererParameters={{ alpha: true }}>
    <T.Scene>
      <T.PerspectiveCamera
        makeDefault
        position={[-0, 0, 50]}
        lookAt={[-2, -2, 0]}
        fov={24}
      >
        <OrbitControls /> 
      </T.PerspectiveCamera>

      {#if heroInfo && heroInfo.assets}
        <T.Group {...groupPos(innerWidth)}>
          <Sprites
            lineSpriteSrc={getAssetSrc("tooth")}
            spriteSrc={getAssetSrc("toothbrush")}
            halftoneSvg={getAssetSrc("halftone")}
          />
          <Lines />
        </T.Group>
      {/if}
    </T.Scene>
  </Canvas>
  <BackDrop backdropSvg={getAssetSrc("backdrop")} />
</div>

<style>
  .canvas {
    z-index: -1;
    position: absolute;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0%;
  }

  :global(.canvas div) {
    z-index: -1 !important;
  }
</style>
