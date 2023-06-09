<script lang="ts">
  import { onMount } from "svelte";
  import Svg from "./Svg.svelte";
  export let iconSrc: string;
  export let name: string;
  export let description: string;
  export let cardElem;
  export let dimensions;

  onMount(() => {
    dimensions = cardElem.getBoundingClientRect();
  });
</script>

<article {...$$props} class={`${$$props.class} card`} bind:this={cardElem}>
  <details>
    <summary>
      <Svg class="card-svg" src={iconSrc} />
      <h2>{name}</h2></summary
    >
    <p>{description}</p>
  </details>
</article>

<style>
  .card {
    display: flex;
    align-items: center;
    padding: 18px;
    border-radius: 15px;
    gap: 1rem;
    --mask-position-y: 100%;
    --mask: linear-gradient(
        to top,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 47%,
        rgba(255, 255, 255, 0.1) 52%,
        rgba(255, 255, 255, 0) 100%
      )
      0 100% / auto 212%;
    -webkit-mask: var(--mask);
    mask: var(--mask);
    -webkit-mask-position: 50% var(--mask-position-y);
    mask-position: 50% var(--mask-position-y);
  }

  :global(.card-svg) {
    height: 52px;
    width: 52px;
  }

  summary {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
  }

  h2 {
    margin-right: auto;
  }

  details {
    width: 100%;
    margin-bottom: 0px;
    padding-bottom: 0px;
    --accordion-border-color: none;
  }

  p {
    margin: 1rem 0px;
  }
</style>
