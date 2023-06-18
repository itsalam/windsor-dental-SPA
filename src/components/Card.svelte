<script lang="ts">
  export let cardElem = undefined;
</script>

<article {...$$props} class={`${$$props.class} card`} bind:this={cardElem}>
  <slot />
</article>

<style>
  .card {
    --mask-position-y: 100%;
    --mask: linear-gradient(
        to top,
        rgb(255 255 255 / 100%) 0%,
        rgb(255 255 255 / 100%) 47%,
        rgb(255 255 255 / 0%) 52%,
        rgb(255 255 255 / 0%) 100%
      )
      0 100% / auto 212%;
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: var(--border-radius);
    -webkit-mask: var(--mask);
    mask: var(--mask);
    -webkit-mask-position: 50% var(--mask-position-y);
    mask-position: 50% var(--mask-position-y);
  }

  :global(.card) {
    padding: 0;
    margin: 0.2rem;
  }

  :global(.card:not(:first-of-type)) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :global(.card:not(:last-of-type)) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :global(.card-svg) {
    width: 52px;
    height: 52px;
  }

  :global(.card-svg svg) {
    width: 52px;
    height: 52px;
  }
</style>
