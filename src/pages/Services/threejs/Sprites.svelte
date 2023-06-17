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
  import { loadData, type Position } from "~/utils/three";

  interactivity();
  transitions();

  const SCALE = 0.03;
  const HALFTONE_SCALE = 2;

  export let getAssetSrc: (arg: string) => string;
  let halftoneSvgSrc: string;
  let chairMesh = [];
  let chartMesh = [];

  const chairPos: Position = [12, 0, -10];
  const chartPos: Position = [21, 3, -15];
  const halfTonesPosArr: Position[] = [[15, 5, -20], [25, -2, -20]]

  onMount(() => {
    loadData(getAssetSrc("chair"), chairMesh, SCALE, () => {
      chairMesh = [...chairMesh];
    });
    loadData(getAssetSrc("chart"), chartMesh, SCALE, () => {
      chartMesh = [...chartMesh];
    });
  });
  halftoneSvgSrc = getAssetSrc("halftone");
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
        scale={0.3}
        position={chairPos}
        rotation={[0, degToRad(180), 0]}
      />
    {/each}

    {#each chartMesh as spriteMesh}
      <T.Mesh
        {...spriteMesh}
        scale={.2}
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
    <Svg src={halftoneSvgSrc} class="halftoneSvg" />
  </HTML>

{/each}
<HTML class="backdrop"
  position={[35, -3, -60]}
  transform
  scale={10}>
  <Svg class="service-backdrop-svg" src={getAssetSrc("backdrop-service")} />
</HTML>
