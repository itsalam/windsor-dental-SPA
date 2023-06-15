<script lang="ts">
  import { fade } from "svelte/transition";
  import Svg from "../../components/Svg.svelte";
  import { sanity, type ContactInfo, type HeroInfo } from "../../store/client";
  import BackDrop from "./BackDrop.svelte";

  let heroInfo: HeroInfo,
    contactInfo: ContactInfo[],
    getSrc: () => string,
    getAssetSrc: () => string;

  sanity.subscribe((value) => {
    console.log(value)
    heroInfo = value.heroInfo;
    contactInfo = value.contactInfo;
    getSrc = value.getSrc;
    getAssetSrc = value.getAssetSrc;
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
        <div class="details glass">
          {#each contactInfo as info}
            <div class="contact-item" class:break-text={info.breakText}>
              <Svg class="contact-svg" src={getSrc(info.thumbnail)} />
              <p>{info.value.replaceAll(", ",",\n")}</p>
            </div>
          {/each}
        </div>
        <div class="border"><span class="line" /><span>or</span><span class="line" /></div>
        <button class="book-button glass"> Book Online </button>
      </div>
    </div>

    <BackDrop backdropSvg={getAssetSrc("backdrop-hero")} />
  </div>
{/await}

<style>
  .hero-body {
    justify-content: end;
    flex-direction: row;
    height: 100vh;
  }

  .hero-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
  }

  .hero-footer button {
    padding: calc(1.33 * var(--form-element-spacing-vertical))
      calc(1.33 * var(--form-element-spacing-horizontal));
    max-width: 210px;
    max-height: 60px;
  }

  .desc {
    display: flex;
    min-width: 400px;
    flex-direction: column;
    justify-content: center;

    flex-basis: 45%;
    width: 45%;
    gap: 1rem;
  }

  .details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.125rem;
    --block-spacing-vertical: 0.5rem;
    padding: 0.5rem;
  }

  .contact-item {
    --block-spacing-horizontal: 1rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
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
    white-space: initial;
    min-width: 110px;
  }

  .border {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem 2rem;
    line-height: 100%;
    align-items: center;
    justify-content: center;
  }
  
  .border .line {
    flex-basis: 100%;
    height: 1px;
    background-color: var(--primary);
    margin: auto 0;
    opacity: 50%;
  }

  .border span {
    font-weight:500;
    vertical-align: middle;
  }


  :global(.contact-svg) {
    height: 32px;
    min-width: 32px;
    max-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

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
      min-width: 0px;
      width: 100%;
      gap: 0.5rem;
      justify-content: end;
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
      padding: 0.5rem;
      gap: 0;
    }

    :global(.contact-svg, .contact-svg svg) {
      height: 24px;
      width: 24px;
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
