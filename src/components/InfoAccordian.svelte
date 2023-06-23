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
    gap: 1rem;
    align-items: flex-start;
    justify-content: start;
    padding: var(--accordion-padding);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-property: background-color, border-color, color, filter, stroke,
      opacity, box-shadow, transform;
  }

  details summary::after {
    position: absolute;
    right: var(--accordion-padding);
    bottom: var(--accordion-padding);
  }

  summary:hover {
    background-color: hsl(0deg 0% 0% / 3.4%);
    filter: brightness(1.2);
    transform: scale(1.01);
  }

  h3 {
    margin-right: auto;
  }

  details[open] h3 {
    color: var(--accordion-open-summary-color);
  }

  details[open] > summary {
    margin-bottom: 0;
    color: var(--accordion-open-summary-color);
    background-color: transparent;
    background-color: #0000000e;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .desc {
    max-height: 0;
    padding: var(--accordion-padding);
    overflow: hidden;
    white-space: break-spaces;
    transition: max-height 0.5s ease-out;
  }

  details[open] .desc {
    max-height: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :global(.card-svg) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
