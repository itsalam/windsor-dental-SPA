<script lang="ts">
  import { spring } from "svelte/motion";
  import Card from "~/components/Card.svelte";
  import { sanity, type TeamInfo } from "../../store/client";

  let teamInfo: TeamInfo;
  let carousel: HTMLDivElement;
  let track: HTMLDivElement;

  let coords = spring(0, {
    stiffness: 0.05,
    damping: 1,
  });

  const randomImgSrc = "https://source.unsplash.com/random/?dental,clinic";

  sanity.subscribe((value) => {
    teamInfo = value.teamInfo;
  });

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    addEventListener("mousemove", moveCarousel);
    addEventListener("mouseup", onMouseUp);
  };

  const onMouseUp = () => {
    removeEventListener("mousemove", moveCarousel);
    removeEventListener("mouseup", onMouseUp);
  };

  const moveCarousel = (e: MouseEvent) => {
    const carouselRect = carousel.getBoundingClientRect();
    const trackWidth = Object.values(track.childNodes).reduce(
      (total, i) => total + (i as HTMLElement).offsetWidth,
      0
    );
    const maxTranslate = trackWidth - carouselRect.width;
    console.log(
      track.offsetWidth,
      track.getBoundingClientRect().width,
      maxTranslate
    );
    coords.set(
      Math.min(Math.max($coords + e.movementX * maxTranslate, -maxTranslate), 0)
    );
  };

  const imageHover = (e) => {}; //TODO ADD IMAGE ON HOVER
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
              .fill(null)
              .map((_, i) => i + 1) as _, i}
              <img
                class="service-backdrop-svg"
                src={`${randomImgSrc}?sig=${i}`}
                alt="Staff at the dental clinic"
                on:mouseover={imageHover}
                on:focus={() => {}}
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
    height: 100svh;
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
    position: relative;
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
    background: linear-gradient(-90deg, rgb(255 255 255) 10%, transparent 25%);
  }

  .track {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .track img {
    padding: 0.5rem;
    transition: all 150ms;
  }

  .track img:hover {
    filter: brightness(1.1);
  }

  @media (orientation: portrait) {
    #team {
      padding-top: 2rem;
    }

    :global(.team-card) {
      flex-direction: column;
      align-items: center;
      max-height: fill-available;
    }

    .display {
      width: 100%;
      max-height: 33%;
      padding: 0.5rem;
      border-radius: var(--border-radius);
    }

    .description {
      overflow: hidden;
    }

    .carousel {
      min-height: 20%;
      margin-top: 0;
    }
  }

  @media (width <= 1080px) {
    .description {
      justify-items: flex-start;
    }

    .title {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
</style>
