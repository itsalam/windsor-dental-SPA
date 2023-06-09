<script lang="ts">
  import Card from "~/components/Card.svelte";
  import { sanity, type TeamInfo } from "../../store/client";

  let teamInfo: TeamInfo;

  sanity.then((data) => {
    data.subscribe((value) => {
      teamInfo = value.teamInfo;
    });
  });

</script>

{#await sanity then}
  <div class="page-container" id="teams-page">
    <div class="title">
      <h1>Meet the Team</h1>
    </div>

    <div class="card-container">
      <Card
        class="team-card glass">
        {teamInfo.description}
      </Card>
    </div>
  </div>
{/await}

<style>
  .page-container {
    height: auto;
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  :global(.service-card) {
    margin: 1rem 0;
  }

  .title {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    top: 8rem;
    position: sticky;
    z-index: 1;
  }

  .card-container {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  #teams-page :global(.card) {
    height: 100%;
    width: 55%;
  }

</style>
