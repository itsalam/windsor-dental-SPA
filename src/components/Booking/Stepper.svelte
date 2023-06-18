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
      {i+1}
      <div class:completed={currStep > i}> <div class="checkmark" />  </div>
    </div>
  {/each}
</div>

<style>
    .stepper {
        --border-width: 2px;
        display: flex;
        justify-content: space-between;
        align-self: center;
        margin-right: auto;
        width: 50%;
    align-items: center;
    }

    .step {
        display: flex;
        position: relative;
        border-color: transparent;
        border-width: var(--border-width);
        border-style: solid;
        background-color: var(--contrast-focus);
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        transition-property: background-color, border-color;
        transition-duration: .2s;
        transition-timing-function: ease-in-out;
    }

    .step.current {
        border-color: var(--highlight);
    }

    .step>div {
        position: absolute;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: var(--highlight);
        transition: opacity 0.2s ease-in-out;
        opacity: 0%;
        overflow: hidden;
    }

    .step>.completed {
        opacity: 100%;
    }

    .checkmark {
        height: 100%;
        width: 100%;
        background-position: center;
        background-size: auto 1rem;
        background-repeat: no-repeat;
        background-image: var(--icon-checkbox);
        transform: translateY(1rem);
        opacity: 0%;
        transition-property: transform, opacity;
        transition-duration: .2s;
        transition-timing-function: ease-in-out;
    }

    .completed>.checkmark {
        opacity: 100%;
        transform: translateY(0rem);
    }

    .line {
        height: 2px;
        flex: 1;
        background-color: var(--contrast-focus);
        margin: 0.5rem;
        transition: background-color 0.2s ease-in-out;
    }

    .line.complete {
        background-color: var(--highlight);
    }

</style>