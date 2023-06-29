<script lang="ts">
  import { HTML, interactivity, transitions } from "@threlte/extras";
  import Svg from "~/components/Svg.svelte";
  import { type Position } from "~/utils/three";

  interactivity();
  transitions();

  const HALFTONE_SCALE = 1.75;
  const SCALE = 0.3;

  export let getAssetSrc: (arg: string) => string;

  let halftoneSvg: string = getAssetSrc("halftone");;
  let innerWidth: number;
  let innerHeight: number;

  const halfTonesPosArr: Position[] = [
    [15.5, -10, -20],
    [25, -1.5, -20],
  ];
  const backgroundPos: Position = [16, 0, -5];

</script>

<svelte:window bind:innerWidth bind:innerHeight />

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
<HTML class="backdrop" position={backgroundPos} transform scale={4}>
  <Svg class="service-backdrop-svg" src={getAssetSrc("backdrop-faq")} />
</HTML>
