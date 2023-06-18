<script lang="ts">
  import Svg from "./Svg.svelte";
  export let iconSrc: string;
  export let name: string;
  export let description: string;
</script>

<details>
  <summary>
    <Svg class="card-svg" src={iconSrc} />
    <h3>{name}</h3>
  </summary>
  <div class="desc">{description}</div>
</details>

<style>
  details {
    --accordion-active-summary-color: --primary;
    --accordion-padding: 1.5rem;

    display: flex;
    width: 100%;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  summary {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: var(--accordion-padding);
    align-items: flex-start;
    justify-content: start;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-property: background-color, border-color, color, filter, stroke,
      opacity, box-shadow, transform;
  }

  details summary::after {
    position: absolute;
    bottom: var(--accordion-padding);
    right: var(--accordion-padding);
  }

  summary:hover {
    transform: scale(1.01);
    filter: brightness(1.2);
    background-color: hsla(0, 0%, 0%, 0.034);
  }

  details[open] h3 {
    color: var(--accordion-open-summary-color);
  }

  details[open] > summary {
    color: var(--accordion-open-summary-color);
    margin-bottom: 0;
    background-color: transparent;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #0000000e;
  }

  details[open] h3 {
  }

  .desc {
    padding: var(--accordion-padding);
    white-space: break-spaces;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
  }

  details[open] .desc {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-height: 100%;
  }

  h3 {
    margin-right: auto;
  }

  :global(.card-svg) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
