<script lang="ts">
  import { Canvas, T } from "@threlte/core";
  import { injectLookAtPlugin } from "~/utils/plugins";

  injectLookAtPlugin();

  let scrollY: number;
  let innerWidth: number;
  let innerHeight: number;
  export let isWide: boolean;

  const cameraPos = (
    innerWidth: number,
    innerHeight: number,
    scrollY: number
  ): {
    position: [x: number, y: number, z: number];
    lookAt: [x: number, y: number, z: number];
    fov: number;
  } => {
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
      fov: 24 - (2 * innerWidth) / 3200,
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
    position: fixed;
    top: 0;
    left: 0%;
    z-index: -1;
    width: 100vw;
    height: 100svh;
  }

  :global(.canvas > div) {
    z-index: -1 !important;
  }
</style>
