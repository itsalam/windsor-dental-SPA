<script lang="ts">
  import { onMount } from "svelte";
  import { sanity, type Hours } from "~/store/client";
  import { sortHours } from "~/utils/helper";
  import { addEscKey, toggleModal } from "~/utils/modal";
  import AppointmentForm from "./AppointmentForm.svelte";
  import CommentsForm from "./ConfirmationForm.svelte";
  import GeneralForm from "./GeneralForm.svelte";
  import Stepper from "./Stepper.svelte";

  let hours: [string, Hours][];
  let modal;
  let forms;
  let innerWidth;
  let currFormIdx = 0;
  let formData;
  $: validForms = [];

  onMount(() => {
    addEscKey(modal);
  });

  const submitForm = (e: SubmitEvent) => {
    e.preventDefault();
    console.log(e);
    for (var [key, value] of formData.entries()) { 
      console.log(key, value);
    }
  };

  sanity.subscribe((value) => {
    hours = sortHours(value.hoursInfo);
  });

  $: if (forms) {
    formData = new FormData(modal.querySelector("form") as HTMLFormElement)
    console.log(formData)
    forms.style.setProperty("--curent-page", currFormIdx);
  }
</script>

<svelte:window bind:innerWidth />

<dialog id="modal" bind:this={modal} open={true}>
  <form on:submit={submitForm}>
    <article>
      <a
        href="#close"
        aria-label="Close"
        class="close"
        data-target="modal"
        on:mousedown={toggleModal(modal)}
      />
      <h3>Request An Appointment</h3>
      <div class="forms" bind:this={forms}>
        <div class="forms-track">
          <GeneralForm bind:isValid={validForms[0]} />
          <AppointmentForm bind:isValid={validForms[1]} {hours} />
          <CommentsForm bind:isValid={validForms[2]} {formData} isFormComplete={validForms.every(v => v)} />
        </div>
      </div>

      <footer>
        <Stepper steps={validForms} currStep={currFormIdx} />
        {#if currFormIdx === 0}
          <button
            class="cancel secondary"
            on:click={toggleModal(modal)}>Cancel</button
          >
        {:else}
          <button class="back secondary before" on:click={() => (currFormIdx -= 1)} />
        {/if}
        {#if currFormIdx === validForms.length - 1}
          <button
            class="main confirm after"
            disabled={!validForms[currFormIdx]}
            type="submit"
            data-target="modal"
          >
            Confirm
          </button>
        {:else}
          <button
            class="main next after"
            type="button"
            disabled={!validForms[currFormIdx]}
            on:click={() => (currFormIdx += 1)}
          >
            Next
          </button>
        {/if}
      </footer>
    </article>
  </form>
</dialog>

<style>
  h3 {
    margin-bottom: 1rem;
  }

  :global(#modal h5) {
    margin-bottom: 0.5rem;
  }

  article {
    width: 100%;
    overflow-x: hidden;
  }

  .forms {
    --curent-page: 0;
    overflow: hidden;
  }

  .forms-track {
    transform: translateX(
      calc(-1 * var(--curent-page) * (100% + var(--block-spacing-vertical)))
    );
    gap: var(--block-spacing-vertical);
    display: flex;
    transition: all 0.3s ease-in-out;
  }

  :global(.form) {
    min-width: 100%;
  }

  dialog {
    --form-element-spacing-vertical: 0.5rem;
    --form-element-spacing-horizontal: 1rem;
  }

  :global(article input) {
    --spacing: 0.5rem;
  }

  :global(.missing) {
    border-color: red;
  }

  :global(.flex) {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
  }

  .secondary {
    width: fit-content;
  }

  :global(.after, .before) {
    position: relative;
  }

  :global(.after)::after, :global(.before)::before {
    content: "";
    width: 1rem;
    height: 1rem;
    background-position: center;
    background-size: auto 1rem;
    background-repeat: no-repeat;
  }

  .back::before {
    content: "";
    position: absolute;
    top: 25%;
    left: 25%;
    width: 1rem;
    height: 1rem;
    background-position: center;
    background-size: auto 1rem;
    background-repeat: no-repeat;
  }

  .back::before {
    background-image: var(--icon-chevron-button);
    transform: rotate(90deg);
  }

  .main {
    position: relative;
    width: min-content;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-items: center;
  }

  .confirm::after {
    display: block;
    background-image: var(--icon-valid);
  }

  .next::after {
    display: block;
    background-image: var(--icon-chevron-button);
    transform: rotate(-90deg);
  }

  :global(input[type="checkbox"] + div) {
    display: flex;
    flex-direction: column;
  }

  :global(input[type="checkbox"]) {
    min-width: 20px;
  }

  :global(.checkbox-label) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  :global(.chip) {
    --font-size: 0.85rem;
    
    width: min-content;
    margin-bottom: 0;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    padding: 0.25rem 0.75rem;
    font-size: var(--font-size);
    color: white;
    cursor: pointer;
    background-color: var(--highlight);
    border-radius: 1rem;
    transition: background-color 0.2s ease-in-out;
  }

  footer {
    --spacing: 0rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: calc(var(--block-spacing-vertical) * 0.25)
      var(--block-spacing-horizontal);
    margin-top: 1rem;
  }

  @media only screen and (width <= 575px) {
    dialog, form {
      width: 100%;
    }
  }
</style>
