<script lang="ts">
    
  import Svg from "./Svg.svelte";
  export let iconSrc: string;
  export let name: string;
  export let description: string;
</script>

<details>
  <summary  class="glass">
    <Svg class="card-svg" src={iconSrc} />
    <h2>{name}</h2></summary>
  <p  class="glass">{description}</p>
</details>

<style>
  summary {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  details[open]>summary {
    background-color: transparent;
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow:none;
  }
  
  details[open]>p {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
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
    padding: 2rem;
  }
</style>