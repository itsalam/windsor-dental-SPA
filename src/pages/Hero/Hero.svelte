<script lang="ts">
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
  import { fade } from "svelte/transition";
  import BookingButton from "~/components/Booking/BookingButton.svelte";
  import Svg from "../../components/Svg.svelte";
  import { sanity, type ContactInfo, type HeroInfo } from "../../store/client";
  import BackDrop from "./BackDrop.svelte";

  let heroInfo: HeroInfo,
    contactInfo: ContactInfo[],
    getSrc: (src: SanityImageSource) => string,
    getAssetSrc: (src: string) => string;

  sanity.subscribe((value) => {
    heroInfo = value.heroInfo;
    contactInfo = value.contactInfo;
    getSrc = value.getSrc;
    getAssetSrc = value.getAssetSrc;
  });
</script>

{#await sanity then}
  <div
    class="hero-body page-container"
    transition:fade={{ delay: 0, duration: 600 }}
    id="home"
  >
    <div class="desc">
      <h1>{heroInfo.greeting}</h1>
      <p class="subtext" transition:fade={{ delay: 2050, duration: 600 }}>
        {heroInfo.subtext}
      </p>
      <div class="hero-footer" transition:fade={{ delay: 2050, duration: 600 }}>
        <div class="details glass">
          {#each contactInfo as info}
            <div class="contact-item" class:break-text={info.breakText}>
              <Svg class="contact-svg" src={getSrc(info.thumbnail)} />
              <p>{info.value.replaceAll(", ", ",\n")}</p>
            </div>
          {/each}
        </div>
        <div class="border">
          <span class="line" /><span>or</span><span class="line" />
        </div>
        <BookingButton />
      </div>
    </div>

    <BackDrop backdropSvg={getAssetSrc("backdrop-hero")} />
  </div>
{/await}

<style>
  .hero-body {
    flex-direction: row;
    justify-content: end;
    height: 100vh;
  }

  .hero-footer {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .desc {
    display: flex;

    flex-basis: 45%;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    width: 45%;
    min-width: 400px;
  }

  .details {
    --block-spacing-vertical: 0.5rem;
    display: flex;
    flex-flow: row wrap;
    gap: 0.125rem;
    padding: 0.5rem;
  }

  .contact-item {
    --block-spacing-horizontal: 1rem;
    display: flex;
    gap: 0.25rem;
    align-items: center;
    padding: 0.25rem;
  }

  .contact-item p {
    font-size: calc(0.8 * var(--font-size));
    white-space: nowrap;
  }

  .break-text {
    flex: 1 1;
  }

  .break-text p {
    min-width: 110px;
    white-space: initial;
  }

  .border {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.25rem 2rem;
    line-height: 100%;
  }

  .border .line {
    flex-basis: 100%;
    max-width: 210px;
    height: 1px;
    margin: auto 0;
    background-color: var(--primary);
    opacity: 0.5;
  }

  .border span {
    font-weight: 500;
    vertical-align: middle;
  }

  :global(.contact-svg) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    max-width: 32px;
    height: 32px;
  }

  h1 {
    --font-size: 2.8rem;
    width: 100%;
  }

  @media only screen and (width <= 1080px) {
    .hero-body {
      flex-direction: column;
      justify-content: flex-end;
      padding: 5%;
    }

    .desc {
      gap: 0.5rem;
      justify-content: end;
      width: 100%;
      min-width: 0;
    }

    .hero-footer {
      gap: 0.5rem;
      padding: 0;
    }

    h1 {
      --font-size: 2.4rem;
    }

    .contact-item {
      --block-spacing-horizontal: 0.5rem;
      gap: 0;
      padding: 0.5rem;
    }

    :global(.contact-svg, .contact-svg svg) {
      width: 24px;
      height: 24px;
    }
  }

  @media only screen and (height <= 1080px) {
    .desc h1 {
      --font-size: 2.5rem;
    }

    .subtext {
      --font-size: 0.9rem;
    }
  }

  @media only screen and (width <= 572px) {
    .desc {
      min-width: 0;
      max-width: 95vw;
    }
  }
</style>
