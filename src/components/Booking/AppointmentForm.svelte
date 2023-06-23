<script lang="ts">
  import { afterUpdate } from "svelte";
  import type { Hours } from "~/store/client";
  import { writeDay, writeHours } from "~/utils/helper";
  import Radio from "../Radio.svelte";

  const BREAKPOINT = 575;
  let innerWidth: number;
  let form: Element;
  let inputs: HTMLInputElement[];
  let currDay: { day: string; range: Hours };
  let fromInput: HTMLInputElement;
  let toInput: HTMLInputElement;
  let availbilties: { day: string; range: Hours }[] = [];
  let validRange: boolean;

  export let hours: [string, Hours][];
  export let isValid = true;

  const validateInputs = () => {
    isValid = inputs !== undefined && inputs.every((i) => i.validity.valid);
    isValid = isValid && availbilties.length > 0;
    if (!fromInput?.disabled && !toInput?.disabled) {
      validRange = fromInput.value < toInput.value;
      validRange =
        validRange && fromInput.validity.valid && toInput.validity.valid;
    } else {
      validRange = false;
    }
  };

  const handleAddDate = () => {
    availbilties.push({
      day: currDay.day,
      range: { from: fromInput.value, to: toInput.value },
    });
    availbilties = availbilties;
  };

  afterUpdate(() => {
    if (form) {
      inputs = [...form.querySelectorAll("input").values()];
      validateInputs();
      form.querySelectorAll("input").forEach((i) => {
        i.removeEventListener("input", validateInputs);
        i.addEventListener("input", validateInputs);
      });
    }
  });
</script>

<svelte:window bind:innerWidth />

<div bind:this={form} class="form">
  <h5>Appointment Info</h5>

  <div class="appointment flex">
    <Radio
      title="Type of Appointment"
      name="appointment"
      inputs={["routine", "consult"]}
      inputLabels={["Routine Cleaning/Exam", "Service Consultation"]}
      on:update={validateInputs}
    />
    <label for="terms" class="checkbox-label">
      <input type="checkbox" id="reoccuring" name="reoccuring" />
      <div>
        Reoccuring Patient?
        <small>Helps us identify your prior history with us.</small>
      </div>
    </label>
  </div>

  <label>
    <h6>Requested Days</h6>
    <div class="dates flex">
      {#each hours as [day, range]}
        <button
          class="secondary"
          class:active={currDay?.day === day}
          type="button"
          disabled={range.closed}
          on:click={() => (currDay = { day, range })}
        >
          <p>{writeDay(day)}</p>
          {#if innerWidth > BREAKPOINT}
            {#if range.closed}
              <small class="closed-icon after" />
            {:else}
              <small>{writeHours(range, false)}</small>
            {/if}
          {/if}
        </button>
      {/each}
    </div>
  </label>

  <div class="times flex">
    <label>
      <h6>From</h6>
      <input
        type="time"
        min={currDay ? `${currDay.range.from}:00` : null}
        max={toInput?.value
          ? toInput.value
          : currDay
          ? `${currDay.range.to}:00`
          : null}
        disabled={!currDay}
        bind:this={fromInput}
      />
    </label>
    <label>
      <h6>To</h6>
      <input
        type="time"
        min={fromInput?.value
          ? fromInput.value
          : currDay
          ? `${currDay.range.from}:00`
          : null}
        max={currDay ? `${currDay.range.to}:00` : null}
        disabled={!currDay}
        bind:this={toInput}
      />
    </label>
    <button
      class="add secondary after"
      type="button"
      disabled={!validRange}
      on:click={handleAddDate}
    />
  </div>
  <h6>Availbilties Picked:</h6>
  <fieldset>
    <div class="times flex">
      {#each availbilties as availbility, i}
        <button
          class={`chip after`}
          type="button"
          on:click={() => (availbilties = availbilties.toSpliced(i, 1))}
        >
          {writeDay(availbility.day)}
          {writeHours(availbility.range, false)}
        </button>
      {/each}
      <input
        type="hidden"
        name="availbilties"
        value={JSON.stringify(availbilties)}
      />
    </div>
  </fieldset>
</div>

<style>
  .flex {
    margin-bottom: calc(0.5 * var(--spacing));
  }

  .appointment {
    flex-direction: column;
    gap: 0.125rem;
    align-items: flex-start;
    margin-bottom: var(--spacing);
  }

  .appointment :global(fieldset) {
    margin-bottom: 0;
  }

  .dates {
    --form-element-spacing-horizontal: 0.8rem;
    gap: 2px;
    align-items: center;
  }

  .dates button {
    margin-bottom: 0;
  }

  .dates .active {
    --background-color: var(--secondary-hover);
    --border-color: var(--secondary-hover);
    --color: var(--secondary-inverse);
    filter: brightness(0.85);
  }

  .dates button:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .dates button:not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .dates small {
    display: block;
    height: 1rem;
  }

  .closed-icon::after {
    display: block;
    margin: auto;
    background-image: var(--icon-close);
  }

  input[type="time"] {
    font-family: Muli;
  }

  .flex > label {
    flex: 1;
  }

  input[type="checkbox"] {
    min-width: 20px;
  }

  .add {
    align-self: flex-end;
    width: 2rem;
    height: 2rem;
  }

  .add::after,
  .add::before {
    position: absolute;
    top: 25%;
    left: 25%;
    width: 1rem;
    height: 1rem;
    content: "";
    background-image: var(--icon-minus);
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 1rem;
  }

  .add::before {
    transform: rotate(90deg);
  }

  .times {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-start;
  }

  .times :global(.chip:hover) {
    background-color: var(--highlight-hover);
  }

  .times :global(.chip::after) {
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    content: "";
    background-image: var(--icon-close);
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 0.75rem;
  }

  @media only screen and (width <= 575px) {
    .dates {
      --form-element-spacing-horizontal: 0.5rem;
    }
  }
</style>
