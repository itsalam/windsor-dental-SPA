

<script lang="ts">
  import { onMount } from "svelte";


  let serviceContainer;
  let innerHeight;
  export let topElement;
  export let elements;

  onMount(() => {
  });

  const handleScroll = () => {
    const topOffset = topElement.getBoundingClientRect().bottom;
    console.log(topOffset)
    elements.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      const scrollDist = element.clientHeight;
      if (top < topOffset) {
        const maskPos = Math.max(1 - Math.abs(top - topOffset) / scrollDist, 0);
        element.animate(
          {
            "--mask-position-y": `${maskPos * 100}%`,
          },
          { duration: 0, fill: "forwards" }
        );
      } else {
        element.animate(
          {
            "--mask-position-y": "100%",
          },
          { duration: 0, fill: "forwards" }
        );
      }
    });
  };
</script>

<svelte:window on:scroll={handleScroll} bind:innerHeight />

<div
  class={`scroll-container ${$$props.class}`}
  bind:this={serviceContainer}
>
  <slot />
</div>