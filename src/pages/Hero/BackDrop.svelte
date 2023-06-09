<script lang="ts">
  import Svg from "~/components/Svg.svelte";
  export let backdropSvg: string;
</script>

<Svg src={backdropSvg} class="hero-backdropSvg" />

<style>
  :global(.hero-backdropSvg) {
    position: absolute;
    top: 0;
    left: 0%;
    z-index: -1;
    height: 100vh;
    min-width: 45vw;
  }

</style>
