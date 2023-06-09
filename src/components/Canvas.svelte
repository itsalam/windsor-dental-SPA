<script lang="ts">
  import { Canvas, T } from "@threlte/core";
  import { injectLookAtPlugin } from "~/utils/plugins";

  injectLookAtPlugin();

  let scrollY;
  let innerWidth;
  let innerHeight;
  
  $: isWide = innerWidth > 992

  const cameraPos = (innerWidth, innerHeight, scrollY) => {
    if (!isWide) {
      const xPos = 2.5;
      const yPos = -5 - (30 * scrollY) / innerHeight;
      return {
        position: [xPos, yPos, 100 - (40 * innerWidth) / 1280],
        lookAt: [xPos, yPos, 0],
        fov: 24 + (3 * innerHeight) / 1280,
      };
    }
    const xPos = 0;
    const yPos = -(30 * scrollY) / innerHeight;
    return {
      position: [xPos, yPos, 100 - (20 * innerWidth) / 1280],
      lookAt: [xPos, yPos, 0],
      fov: 24  - (2 * innerWidth) / 3200,
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
      />
      <!-- <Grid axes={"xyz"} infiniteGrid cellThickness={0.2} sectionThickness={0.5}/> -->
      <slot />

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

  :global(.canvas>div) {
    z-index: -1 !important;
  }
</style>
