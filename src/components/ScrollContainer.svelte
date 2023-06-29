<script lang="ts">
  import { onMount } from "svelte";

  let innerHeight: number;
  export let topElement: Element;
  export let elements: Element[];

  onMount(() => {});

  const handleScroll = () => {
    const topOffset = topElement.getBoundingClientRect().bottom;
    elements.forEach((element: Element) => {
      const top = element.getBoundingClientRect().top;
      const scrollDist = element.clientHeight;
      if (top < topOffset + 15) {
        const maskPos = Math.max(1 - Math.abs(top - topOffset) / scrollDist, 0);
        (element as HTMLElement).style.setProperty(
          "--mask-position-y",
          `${maskPos * 100}%`
        );
        element.animate(
          {
            "--mask-position-y": `${maskPos * 100}%`,
            "mask-position": `50% ${maskPos * 100}%`,
            "-webkit-mask-position": `50% ${maskPos * 100}%`,
          },
          { duration: 0, fill: "forwards" }
        );
      } else {
        (element as HTMLElement).style.setProperty("--mask-position-y", `100%`);
        element.animate(
          {
            "--mask-position-y": "100%",
            "mask-position": "50% 100%",
            "-webkitmask-position": "50% 100%",
          },
          { duration: 0, fill: "forwards" }
        );
      }
    });
  };
</script>

<svelte:window on:scroll={handleScroll} bind:innerHeight />

<div class={`scroll-container ${$$props.class}`}>
  <slot />
</div>

<style>
  .scroll-container {
    --scroll-container-width: 66%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--scroll-container-width);

    max-width: 960px;
  }

  @media (width <= 1080px) {
    .scroll-container {
      --scroll-container-width: 100%;
    }
  }

  @media (orientation: portrait) {
    .scroll-container {
      --scroll-container-width: 100%;
    }
  }
</style>
