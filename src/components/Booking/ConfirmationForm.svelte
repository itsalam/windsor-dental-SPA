<script lang="ts">
  import { writeDay, writeHours } from "~/utils/helper";
  import Label from "./Label.svelte";

  let innerWidth: number;
  let commentTextArea: HTMLTextAreaElement;

  export let formData: FormData;
  export let isFormComplete = false;
  export const isValid = true;
</script>

<svelte:window bind:innerWidth />

<div class="form">
  <Label title="Comments" name="comments">
    <textarea
      id="comments"
      name="comments"
      rows="3"
      cols="50"
      placeholder="Please let us know about any other details such as insurance or anything else related!"
      bind:this={commentTextArea}
    />
  </Label>

  <div class="confirmation">
    {#if isFormComplete && formData}
      <h3>Confirmation of Details</h3>
      <div class="flex">
        <Label title="Patient Full Name">
          <p>{formData.get("firstname") + " " + formData.get("lastname")}</p>
        </Label>
        <Label title="Email">
          <p>{formData.get("email")}</p>
        </Label>
        <Label title="Telephone">
          <p>{formData.get("tel")}</p>
        </Label>
      </div>
      <div class="flex">
        <Label title="Date of Birth">
          <p>{new Date(formData.get("dob").toString()).toLocaleDateString()}</p>
        </Label>
        <Label title="ZIP code">
          <p>{formData.get("zip")}</p>
        </Label>
        <Label title="Gender">
          <p>{formData.get("gender")}</p>
        </Label>
      </div>
      {#if formData.get("representative")}
        <Label title="Representative Full Name">
          <p>
            {formData.get("repFirstname") + " " + formData.get("repLastname")}
          </p>
        </Label>
      {/if}
      <div class="flex">
        <Label title="Appointment Type">
          <p>{formData.get("appointment")}</p>
        </Label>
        <Label title="Reoccuring Patient?">
          <p>{formData.get("reoccuring") === "on" ? "Yes" : "No"}</p>
        </Label>
      </div>
      <Label title="Weekdays requested" name="">
        <div class="chips">
          {#each JSON.parse(formData
              .get("availbilties")
              .toString()) as availbility}
            <span class="chip"
              >{writeDay(availbility.day)}
              {writeHours(availbility.range, false)}</span
            >
          {/each}
        </div>
      </Label>
    {/if}
  </div>
</div>

<style>
  h3 {
    margin-bottom: var(--spacing);
  }

  .flex {
    justify-content: start;
  }

  p {
    font-size: 0.85rem;
  }

  .chips {
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem;
    padding: 0.25rem;
  }

  .chip {
    white-space: nowrap;
    cursor: initial;
  }

  @media (orientation: portrait) {
    .form {
      gap: 1rem;
    }

    .flex {
      flex-flow: row wrap;
      row-gap: 0.375rem;
      padding: 0.375rem 0;
    }
  }
</style>
