<script lang="ts">
  import Card from "~/components/Card.svelte";
  import Svg from "~/components/Svg.svelte";
  import { sanity, type ServiceInfo } from "../../store/client";

  let servicesInfo: ServiceInfo[],
    getAssetSrc: () => string,
    getSrc: () => string;
  let serviceContainer;
  let cards;
  let innerHeight;
  let titleElem;

  sanity.then((data) => {
    data.subscribe((value) => {
      servicesInfo = value.servicesInfo;
      cards = Array(servicesInfo.length);
      getAssetSrc = value.getAssetSrc;
      getSrc = value.getSrc;
    });
  });

  const handleScroll = () => {
    const scrollDist = cards[0].clientHeight;
    const topOffset = titleElem.getBoundingClientRect().bottom;
    cards.forEach((card) => {
      const top = card.getBoundingClientRect().top;
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
    <div class="backdrop">
      <Svg class="service-backdropSvg" src={getAssetSrc("backdrop-service")} />
    </div>
    <div
      class="services-container"
      bind:this={serviceContainer}
    >
      {#each servicesInfo as serviceInfo, i}
        <Card
          class="service-card glass"
          iconSrc={getSrc(serviceInfo.thumbnail)}
          name={serviceInfo.name}
          description={serviceInfo.description}
          bind:cardElem={cards[i]}
        />
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
  }

  .title {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    top: 8rem;
    position: sticky;
    z-index: 1;
  }

  .services-container {
    max-width: 1280px;
    width: 66%;
    display: flex;
    flex-direction: column;
    right: 0;
  }

  .backdrop {
    position: absolute;
    top: 0vh;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  .backdrop :global(.service-backdropSvg) {
    position: sticky;
    transform: scale(1.5) translate(0, 20%);
    top: 0vh;
    right: 0;
    float: right;
    min-width: 45vw;
  }


@media only screen and (max-width: 900px) {
  .services-container {
    width: 100%;
  }
}
</style>
