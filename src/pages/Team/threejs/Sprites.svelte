<script lang="ts">
  import { HTML, interactivity, transitions } from "@threlte/extras";
  import Svg from "~/components/Svg.svelte";

  interactivity();
  transitions();

  const HALFTONE_SCALE = 1.75;

  export let getAssetSrc: (arg: string) => string;

  let halftoneSvg: string;

  const halfTonesPosArr: [x: number, y: number, z: number][] = [
    [-15.5, -4, -20],
    [-25, 3.5, -20],
  ];

  halftoneSvg = getAssetSrc("halftone");
</script>

{#each halfTonesPosArr as halfTonesPos}
  <HTML
    class="backdropGroup"
    position={halfTonesPos}
    scale={[HALFTONE_SCALE, HALFTONE_SCALE, HALFTONE_SCALE]}
    transform
  >
    <Svg src={halftoneSvg} class="halftoneSvg" />
  </HTML>
{/each}
<HTML class="backdrop" position={[-20, -3, -5]} transform scale={4}>
  <Svg class="service-backdrop-svg" src={getAssetSrc("backdrop-team")} />
</HTML>
