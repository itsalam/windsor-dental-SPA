<script lang="ts">
  import Card from "~/components/Card.svelte";
  import InfoAccordian from "~/components/InfoAccordian.svelte";
  import ScrollContainer from "~/components/ScrollContainer.svelte";
  import { sanity, type FAQInfo } from "../../store/client";

  let faqsInfo: FAQInfo[], getAssetSrc: (src: string) => string;
  let cards: Element[];
  let titleElem: Element;
  let midPoint = 0;

  sanity.subscribe((value) => {
    faqsInfo = value.faqsInfo;
    cards = Array(faqsInfo.length);
    getAssetSrc = value.getAssetSrc;
    midPoint = Math.ceil(faqsInfo.length / 2);
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
  .faq-column {
    width: 50%;
  }

  :global(.faq-container) {
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  :global(.faq-card) {
    width: 100%;
    padding: 0rem;
  }

  @media only screen and (width <= 1080px) {
    :global(.faq-container) {
      flex-direction: column;
      gap: 0rem;
    }

    :global(.faq-card) {
      margin: 0;
      margin-bottom: 1rem;
    }
  }
</style>
