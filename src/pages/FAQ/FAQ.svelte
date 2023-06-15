<script lang="ts">
  import Card from "~/components/Card.svelte";
  import InfoAccordian from "~/components/InfoAccordian.svelte";
  import ScrollContainer from "~/components/ScrollContainer.svelte";
  import { sanity, type FAQInfo } from "../../store/client";

  let faqsInfo: FAQInfo[],
    getAssetSrc: () => string;
  let serviceContainer;
  let cards;
  let titleElem;
  let midPoint = 0

  sanity.subscribe((value) => {
    faqsInfo = value.faqsInfo;
    cards = Array(faqsInfo.length);
    getAssetSrc = value.getAssetSrc;
    midPoint = Math.ceil(faqsInfo.length / 2);
  });


</script>

{#await sanity then}
  <div class="page-container" id="faqs-page">
    <div class="title" bind:this={titleElem}>
      <h1>FAQs</h1>
      <p>
        Click on any of the sections to learn more about questions that can quickly save you a call. 
      </p>
    </div>

    <ScrollContainer
      class="faq-container"
      bind:this={serviceContainer}
      elements={cards}
      topElement={titleElem}
    >
      <div class="faq-column">
        {#each faqsInfo.slice(0, midPoint) as faq, i}
          <Card
            class="faq-card glass"
            bind:cardElem={cards[i]}
          >
            <InfoAccordian
              iconSrc={getAssetSrc("question")}
              name={faq.question}
              description={faq.answer}
            />
          </Card>
        {/each}
      </div>
      <div class="faq-column">
        {#each faqsInfo.slice(-midPoint) as faq, i}
          <Card
            class="faq-card glass"
            bind:cardElem={cards[midPoint+i]}
          >
            <InfoAccordian
              iconSrc={getAssetSrc("question")}
              name={faq.question}
              description={faq.answer}
            />
          </Card>
        {/each}
      </div>
    </ScrollContainer>
  </div>
{/await}

<style>


  .faq-column {
    width: 50%;
  }

  .faq-column:nth-of-type(2n) {
    transform: translateY(5%);
  }

  :global(.faq-container) {
    width: 100%;
    display: flex;
    justify-content: center;
    right: 0;
    gap: 1rem;
  }

  :global(.faq-card) {
    width: 100%;
    margin: 1rem;
    padding: 0rem;
    white-space: normal;
  }

  :global(.faq-card h2) {
    white-space: normal;
  }
  
  #faqs-page :global(.card-svg) {
    height: 32px;
    width: 32px;
  }

  #faqs-page :global(.card-svg svg) {
    height: 32px;
    width: 32px;
  }

@media only screen and (max-width: 900px) {
  .faq-container {
  }

}
</style>
