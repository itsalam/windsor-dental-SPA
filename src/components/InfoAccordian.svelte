<script lang="ts">
    
  import Svg from "./Svg.svelte";
  export let iconSrc: string;
  export let name: string;
  export let description: string;
</script>

<details>
  <summary>
    <Svg class="card-svg" src={iconSrc} />
    <h2>{name}</h2></summary>
  <p>{description}</p>
</details>

<style>
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