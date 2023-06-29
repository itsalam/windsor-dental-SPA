<script lang="ts">
  export let steps: boolean[] = [];
  export let currStep: number;
</script>

<div class="stepper">
  {#each steps as _, i}
    {#if i}
      <span class="line" class:complete={currStep >= i} />
    {/if}
    <div class="step" class:current={currStep === i}>
      {i + 1}
      <div class:completed={currStep > i}><div class="checkmark" /></div>
    </div>
  {/each}
</div>

<style>
  .stepper {
    --border-width: 2px;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: space-between;
    width: 50%;
    margin-right: auto;
  }

  .step {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: var(--contrast-focus);
    border-color: transparent;
    border-style: solid;
    border-width: var(--border-width);
    border-radius: 50%;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
    transition-property: background-color, border-color;
  }

  .step.current {
    border-color: var(--highlight);
  }

  .step > div {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--highlight);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .step > .completed {
    opacity: 1;
  }

  .checkmark {
    width: 100%;
    height: 100%;
    background-image: var(--icon-checkbox);
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 1rem;
    opacity: 0;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
    transition-property: transform, opacity;
    transform: translateY(0.5rem);
  }

  .completed > .checkmark {
    opacity: 1;
    transform: translateY(0);
  }

  .line {
    flex: 1;
    height: 2px;
    margin: 0.5rem;
    background-color: var(--contrast-focus);
    transition: background-color 0.2s ease-in-out;
  }

  .line.complete {
    background-color: var(--highlight);
  }
</style>
