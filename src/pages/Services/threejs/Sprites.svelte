<script lang="ts">
  import { T } from "@threlte/core";
  import {
    Float,
    HTML,
    interactivity,
    transitions
  } from "@threlte/extras";
  import { onMount } from "svelte/internal";
  import { degToRad } from "three/src/math/MathUtils";
  import Svg from "~/components/Svg.svelte";
  import { loadData } from "~/utils/three";

  interactivity();
  transitions();

  const SCALE = 0.03;
  const HALFTONE_SCALE = 2;

  export let getAssetSrc: () => string;
  let halftoneSvg;
  let chairMesh = [];
  let chartMesh = [];

  const chairPos = [15, 0, -10];
  const chartPos = [17, 3, -10];
  const halfTonesPosArr = [[15, 5, -20], [25, -2, -20]]

  onMount(() => {
    loadData(getAssetSrc("chair"), chairMesh, SCALE, () => {
      chairMesh = [...chairMesh];
    });
    loadData(getAssetSrc("chart"), chartMesh, SCALE, () => {
      chartMesh = [...chartMesh];
    });
  });
  halftoneSvg = getAssetSrc("halftone");
</script>

<Float
  floatIntensity={5}
  speed={2}
  rotationIntensity={0.1}
  rotationSpeed={[0.0, 0.0, 0]}
>
  <T.Group>
    {#each chairMesh as spriteMesh}
      <T.Mesh
        {...spriteMesh}
        scale={0.5}
        position={chairPos}
        rotation={[0, degToRad(180), 0]}
      />
    {/each}

    {#each chartMesh as spriteMesh}
      <T.Mesh
        {...spriteMesh}
        scale={3}
        position={chartPos}
        rotation={[0, degToRad(180), 0]}
      />
    {/each}
  </T.Group>
</Float>
{#each halfTonesPosArr as halfTonesPos}
  <HTML
    position={halfTonesPos}
    scale={HALFTONE_SCALE}
    transform
  >
    <Svg src={halftoneSvg} class="halftoneSvg" />
  </HTML>

{/each}
<HTML class="backdrop"
  position={[25, -3, -5]}
  transform
  scale={7}>
  <Svg class="service-backdropSvg" src={getAssetSrc("backdrop-service")} />
</HTML>
