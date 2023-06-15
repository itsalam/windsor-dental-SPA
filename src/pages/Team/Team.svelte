<script lang="ts">
  import Card from "~/components/Card.svelte";
  import { sanity, type TeamInfo } from "../../store/client";

  let teamInfo: TeamInfo;
  let getAssetSrc;

  sanity.subscribe((value) => {
    teamInfo = value.teamInfo;
    getAssetSrc = value.getAssetSrc;
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
        
        <img class="service-backdropSvg" src={getAssetSrc("team_photo")} />
        {teamInfo.description}
      </Card>
    </div>
  </div>
{/await}

<style>
  :global(.service-card) {
    margin: 1rem 0;
  }

  .title {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    position: initial;
  }

  .card-container {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  #teams-page :global(.team-card) {
    height: 100%;
    padding: 2rem;
    white-space: break-spaces;
    background-color: rgb(255 255 255 / 75%);
  }

    img {
        width: 720px;
        height: 520px;
        object-fit: cover;
    }

</style>
