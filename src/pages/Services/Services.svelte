<script lang="ts">
  import Card from "~/components/Card.svelte";
  import InfoAccordian from "~/components/InfoAccordian.svelte";
  import { sanity, type ServiceInfo } from "../../store/client";

  let servicesInfo: ServiceInfo[],
    getAssetSrc: () => string,
    getSrc: () => string;
  let serviceContainer;
  let cards;
  let innerHeight;
  let titleElem;

  sanity.subscribe((value) => {
    servicesInfo = value.servicesInfo;
    cards = Array(servicesInfo.length);
    getAssetSrc = value.getAssetSrc;
    getSrc = value.getSrc;
  });

  const handleScroll = () => {
    const topOffset = titleElem.getBoundingClientRect().bottom;
    cards.forEach((card) => {
      const top = card.getBoundingClientRect().top;
      const scrollDist = card.clientHeight;
      if (top < topOffset) {
        const maskPos = Math.max(1 - Math.abs(top - topOffset) / scrollDist, 0);
        card.animate(
          {
            "--mask-position-y": `${maskPos * 100}%`,
          },
          { duration: 20, fill: "forwards" }
        );
      } else {
        card.animate(
          {
            "--mask-position-y": "100%",
          },
          { duration: 20, fill: "forwards" }
        );
      }
    });
  };
</script>

<svelte:window on:scroll={handleScroll} bind:innerHeight />
{#await sanity then}
  <div class="page-container" id="services-page">
    <div class="title" bind:this={titleElem}>
      <h1>Services</h1>
      <p>
        Click on any of the sections to learn more about how we can can treat
        you.
      </p>
    </div>

    <div
      class="services-container"
      bind:this={serviceContainer}
    >
      {#each servicesInfo as serviceInfo, i}
        <Card
          class="service-card glass"
          bind:cardElem={cards[i]}
        >
          <InfoAccordian
            iconSrc={getSrc(serviceInfo.thumbnail)}
            name={serviceInfo.name}
            description={serviceInfo.description}
          />
        </Card>
      {/each}
    </div>
  </div>
{/await}

<style>
  .page-container {
    height: auto;
    position: relative;
  }

  :global(.service-card) {
    margin: 1rem 0;
    padding: 0;
  }

  .title {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    top: 8rem;
    position: sticky;
    z-index: 1;
    width: 66%;
  }

  .services-container {
    max-width: 960px;
    width: 66%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    right: 0;
  }

  /* .backdrop {
    position: absolute;
    top: 0vh;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  .backdrop :global(.service-backdropSvg) {
    position: sticky;
    transform: scale(1.33) translate(0, 30%);
    top: 0vh;
    right: 0;
    float: right;
    min-width: 55vw;
    
  } */


@media only screen and (max-width: 900px) {
  .services-container {
    width: 100%;
  }
    .backdrop :global(.service-backdropSvg) {
    min-width: 80vw;
    transform: scale(1.5) translate(0, 90%);
  }
}
</style>
