<script lang="ts">
  import { Canvas, T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import { sanity, type SanityAsset } from "~/store/client";
  import { injectLookAtPlugin } from "~/utils/plugins";
  import HeroGroup from "./three/Hero/HeroGroup.svelte";
  import ServiceGroup from "./three/Services/ServiceGroup.svelte";

  injectLookAtPlugin();

  let assets: SanityAsset[];
  let getAssetSrc: () => string;

  let scrollY;
  let innerWidth;
  let innerHeight;
  
  $: isWide = innerWidth > 992

  sanity.then((data) => {
    data.subscribe((value) => {
      assets = value.assets;
      getAssetSrc = value.getAssetSrc;
    });
  });

  const cameraPos = (innerWidth, innerHeight, scrollY) => {
    if (!isWide) {
      const xPos = 2.5;
      const yPos = -5 - (20 * scrollY) / innerHeight;
      return {
        position: [xPos, yPos, 100 - (40 * innerWidth) / 1280],
        lookAt: [xPos, yPos, 0],
        fov: 24 + (3 * innerHeight) / 1280,
      };
    }
    const xPos = 0;
    const yPos = 2 - (30 * scrollY) / innerHeight;
    return {
      position: [xPos, yPos, 100 - (20 * innerWidth) / 1280],
      lookAt: [xPos, yPos, 0],
      fov: 30  - (6 * innerWidth) / 3200,
    };
  };

</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

<div class="canvas">
  <Canvas frameloop="demand" rendererParameters={{ alpha: true }}>
    <T.Scene>
      <T.PerspectiveCamera
        makeDefault
        {...cameraPos(innerWidth, innerHeight, scrollY)}
      >
        <OrbitControls />
      </T.PerspectiveCamera>
      <!-- <Grid axes={"xyz"} infiniteGrid cellThickness={0.2} sectionThickness={0.5}/> -->
      {#if assets}
        <HeroGroup {getAssetSrc} {isWide} />
        <ServiceGroup {getAssetSrc} {isWide} />
      {/if}
    </T.Scene>
  </Canvas>
</div>

<style>
  .canvas {
    z-index: -1;
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0%;
  }

  :global(.canvas div) {
    z-index: -1 !important;
  }
</style>
