<script lang="ts">
  import { spring } from "svelte/motion";
  import Card from "~/components/Card.svelte";
  import { sanity, type TeamInfo } from "../../store/client";

  let teamInfo: TeamInfo;
  let getAssetSrc: (arg: string) => string;
  let carousel: HTMLDivElement;
  let track: HTMLDivElement;
  $: mouseDown = false;

  let coords = spring(0, {
    stiffness: 0.05,
    damping: 1,
  });

  const randomImgSrc = "https://source.unsplash.com/random/?dentist,staff";

  sanity.subscribe((value) => {
    teamInfo = value.teamInfo;
    getAssetSrc = value.getAssetSrc;
  });

  const onMouseDown = () => {
    event.preventDefault();
    addEventListener("mousemove", moveCarousel);
    addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    removeEventListener("mousemove", moveCarousel);
    removeEventListener("mouseup", onMouseUp);
  };

  const moveCarousel = (e) => {
    const carouselRect = carousel.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const maxTranslate = trackRect.width - carouselRect.width;
    coords.set(
      Math.min(Math.max($coords + e.movementX * maxTranslate, -maxTranslate), 0)
    );
  };

  const imageHover = (e) => {};
</script>

{#await sanity then}
  <div class="page-container" id="team">
    <div class="title">
      <h1>Meet the Team</h1>
    </div>

    <Card class="team-card glass">
      <img
        class="display"
        src={randomImgSrc}
        alt="Staff at the dental clinic"
      />
      <div class="description">
        <h2>{teamInfo.slogan}</h2>
        <span />
        <p>{teamInfo.description}</p>
        <div class="carousel" bind:this={carousel} on:mousedown={onMouseDown}>
          <div
            class="track"
            bind:this={track}
            style={`transform: translateX(${$coords}px);`}
          >
            {#each Array(5)
              .fill()
              .map((_, i) => i + 1) as i}
              <img
                class="service-backdrop-svg"
                src={`${randomImgSrc}?sig=${i}`}
                alt="Staff at the dental clinic"
                on:mouseover={imageHover}
              />
            {/each}
          </div>
        </div>
      </div>
    </Card>
  </div>
{/await}

<style>
  #team {
    height: 100vh;
  }

  .title {
    position: initial;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .description span {
    width: 100%;
    height: 1px;
    background-color: #000;
    opacity: 0.5;
  }

  #team :global(.team-card) {
    display: flex;
    flex: 1;
    align-items: flex-start;
    height: 100%;
    padding: 2rem;
    white-space: break-spaces;
    background-color: rgb(255 255 255 / 75%);
  }

  .display {
    align-self: center;
    width: 25%;
    height: 100%;
    object-fit: cover;
  }

  .carousel {
    display: flex;
    width: 100%;
    height: 30%;
    margin-top: auto;
    overflow: hidden;
  }

  .carousel::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: "";
    background: linear-gradient(-90deg, rgb(255 255 255) 0%, transparent 15%);
  }

  .track {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    min-width: 140%;
    height: 100%;
  }

  .track img {
    transition: all 150ms;
  }

  .track img:hover {
    filter: brightness(1.1);
  }

  @media only screen and (width <= 1080px) {
    :global(.team-card) {
      flex-direction: column;
      align-items: center;
    }

    .description {
      justify-items: flex-start;
    }

    .title {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
</style>
