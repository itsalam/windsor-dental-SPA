<script lang="ts">
    
  import Svg from "./Svg.svelte";
  export let iconSrc: string;
  export let name: string;
  export let description: string;
</script>

<details>
  <summary  class="glass">
    <Svg class="card-svg" src={iconSrc} />
    <h3>{name}</h3></summary>
  <p  class="glass">{description}</p>
</details>

<style>
  summary {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: start;
    padding: 1rem 2rem;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  }

  details[open]>summary {
    margin-bottom: 0;
    background-color: transparent;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow:none;
  }
   
  p {
    padding: 2rem;
  }

  details[open]>p {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  h3 {
    margin-right: auto;
  }

  details {
    --accordion-border-color: none;
    width: 100%;
    padding-bottom: 0;
    margin-bottom: 0;
  }


</style>