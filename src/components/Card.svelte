<script lang="ts">
  export let cardElem;
</script>

<article {...$$props} class={`${$$props.class} card`} bind:this={cardElem}>
  <slot />
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


</style>
