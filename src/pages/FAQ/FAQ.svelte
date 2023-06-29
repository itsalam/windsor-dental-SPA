<script lang="ts">
  import Card from "~/components/Card.svelte";
  import InfoAccordian from "~/components/InfoAccordian.svelte";
  import ScrollContainer from "~/components/ScrollContainer.svelte";
  import { sanity, type FAQInfo } from "../../store/client";

  let faqsInfo: FAQInfo[], getAssetSrc: (src: string) => string;
  let cards: Element[];
  let titleElem: Element;

  sanity.subscribe((value) => {
    faqsInfo = value.faqsInfo;
    cards = Array(faqsInfo.length);
    getAssetSrc = value.getAssetSrc;
  });
</script>

{#await sanity then}
  <div class="page-container" id="faqs">
    <div class="title" bind:this={titleElem}>
      <h1>FAQs</h1>
      <p>
        Click on any of the sections to learn more about questions that can
        quickly save you a call.
      </p>
    </div>

    <ScrollContainer
      class="faq-container"
      elements={cards}
      topElement={titleElem}
    >
      {#each faqsInfo as faq, i}
        <Card class="faq-card glass" bind:cardElem={cards[i]}>
          <InfoAccordian
            iconSrc={getAssetSrc("question")}
            name={faq.question}
            description={faq.answer}
          />
        </Card>
      {/each}
    </ScrollContainer>
  </div>
{/await}

<style>
  :global(.faq-card) {
    width: 100%;
    padding: 0;
  }

  :global(.faq-container.scroll-container) {
    width: 100%;
  }

  @media (orientation: portrait) {
    :global(.faq-container) {
      flex-direction: column;
      gap: 0;
    }

    :global(.faq-card) {
      margin: 0;
      margin-bottom: 1rem;
    }
  }
</style>
