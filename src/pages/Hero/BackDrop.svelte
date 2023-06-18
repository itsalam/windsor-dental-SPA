<script lang="ts">
  import Svg from "~/components/Svg.svelte";
  export let backdropSvg: string;
</script>

<Svg src={backdropSvg} class="hero-backdrop-svg" />

<style>
  :global(.hero-backdrop-svg) {
    position: absolute;
    top: 0;
    left: 0%;
    z-index: -1;
    min-width: 60vw;
    height: 100vh;
  }
</style>
