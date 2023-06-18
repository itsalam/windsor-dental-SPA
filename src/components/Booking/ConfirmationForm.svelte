<script lang="ts">
  import { writeDay, writeHours } from "~/utils/helper";
  import InfoLabel from "./InfoLabel.svelte";

  const TEMP_DATA = {"firstname":"Vincent","lastname":"Lam","email":"vincentthanhlam@gmail.com","tel":"7783882376","DOB":"2023-06-01","zip":"V5H 0E1","gender":"M","representative":"on","rep-firstname":"Vincent","rep-lastname":"Lam","apointment":"routine","reoccuring":"on","availbilties": [{"day":"tuesday","range":{"from":"13:06","to":"17:06"}},{"day":"tuesday","range":{"from":"13:06","to":"17:06"}}],"comments":""}

  let innerWidth;
  let form: Element;
  export let formData: FormData;
  export let isFormComplete = false;
  export const isValid = true;
</script>

<svelte:window bind:innerWidth />

<div bind:this={form} class="form">
  <h5>Comments</h5>
  <div class="flex">
    <label for="comments">
      <textarea id="comments" name="comments" rows="3" cols="50" placeholder="Please let us know about any other details such as insurance or anything else related!" />
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
        {new Date(formData.get("dob")).toLocaleDateString()}
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
        {formData.get("reoccuring") === "on"? "Yes" : "No" }
      </InfoLabel>
    </div>
    <InfoLabel title="Weekdays requested" />
    <div class="chips">
      {#each JSON.parse(formData.get("availbilties")) as availbility}
        <span class="chip">{writeDay(availbility.day)} {writeHours(availbility.range, false)}</span>
      {/each}
    </div>

  {/if}
</div>

<style>
  h3 {
    margin-bottom: var(--spacing);
  }

  .flex {
    justify-content: start
  }

  .chips {
    padding: 0.25rem;
    display: flex;
    gap: 0.5rem;
  }

  .chip {
    white-space: nowrap;
    cursor: initial;
    
  }
</style>
