<script lang="ts">
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
  import { fade } from "svelte/transition";
  import { sanity, type ContactInfo, type HeroInfo } from "../../store/client";
  import Svg from "../Svg.svelte";
  import HeroCanvas from "./HeroCanvas.svelte";

  let heroInfo: HeroInfo,
    contactInfo: ContactInfo[],
    getSrc: (src: SanityImageSource) => string;

  sanity.then((data) => {
    data.subscribe((value) => {
      heroInfo = value.heroInfo[0];
      contactInfo = value.contactInfo;
      getSrc = value.getSrc;
    });
  });

  const loadPromise = Promise.all([
    sanity,
    new Promise((r) => setTimeout(r, 1000)),
  ]);
</script>

{#await loadPromise}
  <progress />
{:then}
  <div class="hero-body" transition:fade={{ delay: 350, duration: 600 }}>
    <div class="desc">
      <h1>{heroInfo.greeting}</h1>
      <p class="subtext" transition:fade={{ delay: 2050, duration: 600 }}>
        {heroInfo.subtext}
      </p>
      <div class="hero-footer" transition:fade={{ delay: 2050, duration: 600 }}>
        <button> Book Online </button>
        <div class="details">
          {#each contactInfo as info}
            <div class="contact-item">
              <Svg class="contact-svg" src={getSrc(info.thumbnail)} />
              <p>{info.value}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <HeroCanvas {getSrc} {heroInfo} />
{/await}

<style>
  progress {
    position: absolute;
    height: 2px;
    padding: 0px;
    margin: 0px;
  }

  .hero-body {
    display: flex;
    justify-content: start;
    place-items: center;
    height: 100vh;
    padding: 5% 10%;
  }

  .hero-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0rem 2rem;
    gap: 2rem;
  }

  .hero-footer button {
    padding: calc(1.33 * var(--form-element-spacing-vertical))
      calc(1.33 * var(--form-element-spacing-horizontal));
    max-width: 210px;
  }

  .desc {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex-basis: 45%;
    /* width: 45%; */
    gap: 1rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .contact-item p {
    font-size: calc(0.75 * var(--font-size));
  }

  :global(.contact-svg) {
    min-width: 32px;
    max-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subtext {
    font-size: calc(0.9 * var(--font-size));
  }

  h1 {
    width: 100%;
    font-weight: 500;
    margin: 0px;
  }

  @media only screen and (max-width: 992px) {
    .hero-body {
      flex-direction: column;
      justify-content: flex-end;
    }

    .desc {
      width: 100%;
      margin: 1rem 1rem;
    }

    h1 {
      --font-size: 2.5rem;
    }
  }
</style>
