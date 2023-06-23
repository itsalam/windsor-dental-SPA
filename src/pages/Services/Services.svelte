<script lang="ts">
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
  import Card from "~/components/Card.svelte";
  import InfoAccordian from "~/components/InfoAccordian.svelte";
  import ScrollContainer from "~/components/ScrollContainer.svelte";
  import { sanity, type ServiceInfo } from "../../store/client";

  let servicesInfo: ServiceInfo[], getSrc: (src: SanityImageSource) => string;
  let cards: Element[];
  let titleElem: Element;
  let topOffset = 0;

  sanity.subscribe((value) => {
    servicesInfo = value.servicesInfo;
    cards = Array(servicesInfo.length);
    getSrc = value.getSrc;
  });
</script>

<!-- <svelte:window on:scroll={handleScroll} bind:innerHeight /> -->
{#await sanity then}
  <div class="page-container" id="services">
    <div class="title" bind:this={titleElem}>
      <h1>Services</h1>
      <p>
        Click on any of the sections to learn more about how we can can treat
        you.
      </p>
    </div>

    <ScrollContainer
      class="services-container"
      elements={cards}
      topElement={titleElem}
      {topOffset}
    >
      {#each servicesInfo as serviceInfo, i}
        <Card class="service-card glass" bind:cardElem={cards[i]}>
          <InfoAccordian
            iconSrc={getSrc(serviceInfo.thumbnail)}
            name={serviceInfo.name}
            description={serviceInfo.description}
          />
        </Card>
      {/each}
    </ScrollContainer>
  </div>
{/await}

<style>
  .page-container {
    position: relative;
  }

  :global(.services-container) {
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 66%;
    max-width: 960px;
  }

  @media (orientation: portrait) {
    :global(.services-container) {
      width: 100%;
    }
  }

  @media (width <= 1080px) {
    :global(.services-container) {
      width: 100%;
    }
  }
</style>
