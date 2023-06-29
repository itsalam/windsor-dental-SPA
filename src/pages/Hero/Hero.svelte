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
    transition:fade={{ delay: 0, duration: 650 }}
    id="home"
  >
    <div class="desc">
      <h1>{heroInfo.greeting}</h1>
      <p class="subtext" transition:fade={{ delay: 1550, duration: 350 }}>
        {heroInfo.subtext}
      </p>
      <div class="hero-footer" transition:fade={{ delay: 1550, duration: 350 }}>
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
    height: 100svh;
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
    max-width: 10rem;
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
    min-width: 1.2rem;
    max-width: 1.2rem;
    height: 1.2rem;
  }

  @media (orientation: portrait) {
    .desc h1 {
      margin-bottom: auto;
    }

    .details {
      --block-spacing-vertical: 0.25rem;
      padding: 0.25rem;
    }

    .hero-body {
      flex-direction: column;
      justify-content: flex-end;
      padding: 5%;
    }

    .subtext {
      --font-size: 0.8rem;
    }

    .contact-item {
      --block-spacing-horizontal: 0.5rem;
      gap: 0;
      padding: 0.5rem;
    }

    .desc {
      flex-basis: 100%;
      gap: 1rem;
      justify-content: end;
      width: 100%;
      min-width: 0;
      padding-top: 4rem;
      padding-bottom: 1rem;
    }

    .hero-footer {
      gap: 0.5rem;
      align-self: center;
      padding: 0;
    }

    :global(.contact-svg, .contact-svg svg) {
      width: 1rem;
      height: 1rem;
    }
  }
</style>
