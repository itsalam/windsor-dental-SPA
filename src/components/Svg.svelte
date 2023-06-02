<script>
  import { onMount } from "svelte";

  export let src = "";

  let svgContent = "";

  onMount(async () => {
    const response = await fetch(src);
    svgContent = await response.text();
  });
</script>

{#if svgContent}
  <div {...$$props} class={`${$$props.class} svg-div`}>
    {@html svgContent}
  </div>
{/if}

<style>
</style>
