<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Label from "./Label.svelte";
  const dispatch = createEventDispatcher();

  export let name: string;
  export let inputs: string[];
  export let inputLabels: string[];
  export let title: string;
  export let required: boolean = false;
  let currFocused: number;

  const handleClick = (i: number) => () => {
    const input: HTMLInputElement = document.getElementById(
      inputs[i]
    ) as HTMLInputElement;
    if (input) {
      input.checked = !input.checked;
      dispatch("update");
      currFocused = currFocused === i ? null : i;
    }
  };
</script>

<Label {name} {title} {required}>
  <fieldset class="radio-div">
    {#each inputs as input, i}
      <label for={input}>
        <input type="radio" id={input} {name} value={input} {required} />
        <button
          class=""
          class:pressed={currFocused === i}
          type="button"
          on:click={handleClick(i)}>{inputLabels[i]}</button
        >
      </label>
    {/each}
  </fieldset>
</Label>

<style>
  .radio-div {
    --border-color: var(--form-element-border-color);
    display: flex;
    justify-content: space-around;
    height: auto;

    /* padding: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal); */
    margin-top: calc(var(--spacing) * 0.125);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius);
  }

  .radio-div label {
    margin: 0;
  }

  input[type="radio"] {
    position: absolute;
    visibility: none;
    opacity: 0;
  }

  input[type="radio"] + button {
    --primary: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: calc(0.5 * var(--form-element-spacing-vertical))
      calc(
        0.5 * var(--form-element-spacing-horizontal) + var(--spacing) * 0.125
      );
    color: var(--h1-color);
    cursor: pointer;
    background-color: var(--background-color);
    border-color: var(--form-element-border-color);
    border-radius: var(--border-radius);
  }

  input[type="radio"] + button:hover,
  input[type="radio"] + button:active,
  .pressed {
    --background-color: var(--primary-hover);
    border: none;
  }

  .radio-div label:not(:first-of-type) input[type="radio"] + button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .radio-div label:not(:last-of-type) input[type="radio"] + button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
