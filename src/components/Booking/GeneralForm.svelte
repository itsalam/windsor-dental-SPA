<script lang="ts">
  import { afterUpdate } from "svelte";
  import Label from "./Label.svelte";
  import Radio from "./Radio.svelte";

  const BREAKPOINT = 575;

  let isNotPatient: boolean = false;
  let innerWidth: number;
  let form: Element;
  let inputs: HTMLInputElement[];
  export let isValid = true;

  const validateInputs = () => {
    inputs = [...form.querySelectorAll("input").values()];
    isValid = inputs !== undefined && inputs.every((i) => i.validity.valid);
  };

  afterUpdate(() => {
    if (form) {
      form.querySelectorAll("input").forEach((i) => {
        i.removeEventListener("input", validateInputs);
        i.addEventListener("input", validateInputs);
      });
      validateInputs();
    }
  });
</script>

<svelte:window bind:innerWidth />

<div bind:this={form} class="form">
  <h5>Patient Info</h5>
  <div class="flex">
    <Label title="First name" type="text" name="firstName" required />
    <Label title="Last name" type="text" name="lastName" required />
  </div>

  <div class="flex">
    <Label
      className="email-input"
      title="Email address"
      type="email"
      name="email"
      placeholder="___-___-____"
      required
    />
    <Label
      className="tel-input"
      title="Phone Number"
      type="tel"
      name="tel"
      placeholder="___-___-____"
      required
    />
  </div>

  <div class="flex">
    <Label title="Date of Birth" type="date" name="dob" required>
      <input type="date" id="dob" name="dob" required />
    </Label>

    <Label
      title="Zip Code"
      type="text"
      name="zip"
      placeholder="V5N 2R6"
      required
    />

    {#if innerWidth > BREAKPOINT}
      <div id="gender">
        <Radio
          title="Gender"
          name="gender"
          inputs={["M", "F", "O"]}
          inputLabels={["M", "F", "O"]}
          on:update={validateInputs}
          required
        />
      </div>
    {/if}
  </div>

  <div class="flex">
    {#if innerWidth < BREAKPOINT}
      <div id="gender">
        <Radio
          title="Gender"
          name="gender"
          inputs={["M", "F", "O"]}
          inputLabels={["M", "F", "O"]}
          on:update={validateInputs}
        />
      </div>
    {/if}
    <label class="checkbox-label">
      <input
        type="checkbox"
        id="representative"
        name="representative"
        bind:checked={isNotPatient}
      />
      <div>
        Are you requesting on behalf of someone else?
        <small>(e.g. a child, parent, or spouse etc.)</small>
      </div>
    </label>
  </div>
  {#if isNotPatient}
    <div class="rep-form">
      <h5>Representative Info</h5>
      <div class="flex">
        <Label title="First name" type="text" name="repFirstName" required />
        <Label title="First name" type="text" name="repLastName" required />
      </div>
    </div>
  {/if}
</div>

<style>
  #gender {
    align-self: flex-start;
  }

  .flex > label {
    flex: 1;
  }

  :global(.email-input) {
    flex-basis: 100%;
  }

  :global(.tel-input) {
    flex-basis: 40%;
    min-width: 10rem;
  }

  label small {
    color: var(--muted-color);
  }

  .rep-form {
    padding-top: 1rem;
  }
</style>
