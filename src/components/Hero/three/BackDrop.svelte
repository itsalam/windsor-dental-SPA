<script lang="ts">
  import Svg from "~/components/Svg.svelte";

  const SCALE = 1.5;

  export let backdropSvg: string;

  let backdropMeshs = [];
  let halftoneMeshs = [];
</script>

<Svg src={backdropSvg} class="backdropSvg" />

<style>
  :global(.backdropSvg) {
    position: absolute;
    transform: scale(1.25);
    bottom: 10vh;
    right: 0%;
    z-index: -1;
    width: 80vw;
    min-width: 1080px;
  }

  :global(.halftoneSvg) {
    opacity: 5%;
    position: relative;
    top: 50%;
    z-index: -1;
  }
</style>
