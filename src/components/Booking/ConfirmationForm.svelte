<script lang="ts">
  import { writeDay, writeHours } from "~/utils/helper";
  import InfoLabel from "./InfoLabel.svelte";

  let innerWidth: number;
  export let formData: FormData;
  export let isFormComplete = false;
  export const isValid = true;
</script>

<svelte:window bind:innerWidth />

<div class="form">
  <h5>Comments</h5>
  <div class="flex">
    <label for="comments">
      <textarea
        id="comments"
        name="comments"
        rows="3"
        cols="50"
        placeholder="Please let us know about any other details such as insurance or anything else related!"
      />
    </label>
  </div>
  {#if isFormComplete && formData}
    <h3>Confirmation of Details</h3>
    <div class="flex">
      <InfoLabel title="Patient Full Name">
        {formData.get("firstname") + " " + formData.get("lastname")}
      </InfoLabel>
      <InfoLabel title="Email">
        {formData.get("email")}
      </InfoLabel>
      <InfoLabel title="Telephone">
        {formData.get("tel")}
      </InfoLabel>
    </div>
    <div class="flex">
      <InfoLabel title="Date of Birth">
        {new Date(formData.get("dob").toString()).toLocaleDateString()}
      </InfoLabel>
      <InfoLabel title="ZIP code">
        {formData.get("zip")}
      </InfoLabel>
      <InfoLabel title="Gender">
        {formData.get("gender")}
      </InfoLabel>
    </div>
    {#if formData.get("representative")}
      <InfoLabel title="Representative Full Name">
        {formData.get("rep-firstname") + " " + formData.get("rep-lastname")}
      </InfoLabel>
    {/if}
    <div class="flex">
      <InfoLabel title="Appointment Type">
        {formData.get("appointment")}
      </InfoLabel>
      <InfoLabel title="Reoccuring Patient?">
        {formData.get("reoccuring") === "on" ? "Yes" : "No"}
      </InfoLabel>
    </div>
    <InfoLabel title="Weekdays requested" />
    <div class="chips">
      {#each JSON.parse(formData.get("availbilties").toString()) as availbility}
        <span class="chip"
          >{writeDay(availbility.day)}
          {writeHours(availbility.range, false)}</span
        >
      {/each}
    </div>
  {/if}
</div>

<style>
  h3 {
    margin-bottom: var(--spacing);
  }

  .flex {
    justify-content: start;
  }

  .chips {
    display: flex;
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
      row-gap: 0.25rem;
      padding: 0.375rem 0;
    }
  }
</style>
