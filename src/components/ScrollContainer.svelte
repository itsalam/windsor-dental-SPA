

<script lang="ts">
  import { onMount } from "svelte";

  let innerHeight: number;
  export let topElement: Element;
  export let elements: Element[];

  onMount(() => {
  });

  const handleScroll = () => {
    const topOffset = topElement.getBoundingClientRect().bottom;
    elements.forEach((element: Element) => {
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
>
  <slot />
</div>