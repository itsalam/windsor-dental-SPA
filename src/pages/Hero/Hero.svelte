<script lang="ts">
  import { fade } from "svelte/transition";
  import Svg from "../../components/Svg.svelte";
  import { sanity, type ContactInfo, type HeroInfo } from "../../store/client";
  import BackDrop from "./BackDrop.svelte";

  let heroInfo: HeroInfo,
    contactInfo: ContactInfo[],
    getSrc: () => string,
    getAssetSrc: () => string;

  sanity.then((data) => {
    data.subscribe((value) => {
      heroInfo = value.heroInfo;
      contactInfo = value.contactInfo;
      getSrc = value.getSrc;
      getAssetSrc = value.getAssetSrc;
    });
  });
</script>

{#await sanity then}
  <div
    class="hero-body page-container"
    transition:fade={{ delay: 350, duration: 600 }}
  >
    <div class="desc">
      <h1>{heroInfo.greeting}</h1>
      <p class="subtext" transition:fade={{ delay: 2050, duration: 600 }}>
        {heroInfo.subtext}
      </p>
      <div class="hero-footer" transition:fade={{ delay: 2050, duration: 600 }}>
        <button class="book-button glass"> Book Online </button>
        <div class="details">
          {#each contactInfo as info}
            <article class="contact-item glass">
              <Svg class="contact-svg" src={getSrc(info.thumbnail)} />
              <p>{info.value}</p>
            </article>
          {/each}
        </div>
      </div>
    </div>
    <BackDrop backdropSvg={getAssetSrc("backdrop-hero")} />
  </div>
{/await}

<style>
  .hero-body {
    display: flex;
    justify-content: end;
    place-items: center;
  }

  .hero-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0rem 2rem;
    gap: 1rem;
  }

  .hero-footer button {
    padding: calc(1.33 * var(--form-element-spacing-vertical))
      calc(1.33 * var(--form-element-spacing-horizontal));
    max-width: 210px;
    max-height: 60px;
  }

  .desc {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex-basis: 45%;
    width: 45%;
    gap: 1rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    --block-spacing-vertical: 0.5rem;
  }

  .contact-item {
    --block-spacing-horizontal: 1rem;
    margin: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .contact-item p {
    font-size: calc(0.75 * var(--font-size));
  }

  :global(.contact-svg) {
    height: 32px;
    min-width: 32px;
    max-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* .subtext {
    font-size: calc(0.9 * var(--font-size));
  } */

  h1 {
    --font-size: 2.8rem;
    width: 100%;
  }

  @media only screen and (max-width: 992px) {
    .hero-body {
      flex-direction: column;
      justify-content: flex-end;
      padding: 5%;
    }

    .desc {
      width: 100%;
      gap: 0rem;
    }

    .hero-footer {
      gap: 0.5rem;
    }

    h1 {
      --font-size: 2.4rem;
    }
  }

  @media only screen and (max-height: 900px) {
    h1 {
      --font-size: 2.2rem;
    }
    .desc {
      --font-size: 0.9rem;
    }
  }
</style>
