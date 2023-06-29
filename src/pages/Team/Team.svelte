<script lang="ts">
  import { beforeUpdate } from "svelte";
  import { spring } from "svelte/motion";
  import Card from "~/components/Card.svelte";
  import { sanity, type TeamInfo } from "../../store/client";

  const randomImgSrc = "https://source.unsplash.com/random/?dentist,clinic";

  const DEFAULT_OFFSET = 50;

  let teamInfo: TeamInfo;
  let container: HTMLDivElement;
  let carousel: HTMLDivElement;
  let track: HTMLDivElement;
  let preview: HTMLImageElement;
  let mouseDown = false;
  let previewActive = false;

  let trackCoords = spring(0, {
    stiffness: 0.05,
    damping: 1,
  });

  let previewCoords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.04,
      damping: 0.5,
    }
  );

  let currMainImgSrc = randomImgSrc;

  sanity.subscribe((value) => {
    teamInfo = value.teamInfo;
  });

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    mouseDown = true;
    addEventListener("mousemove", moveCarousel);
    addEventListener("mouseup", onMouseUp);
    addEventListener("mouseleave", onMouseUp);
  };

  const onMouseUp = () => {
    mouseDown = false;
    removeEventListener("mousemove", moveCarousel);
    removeEventListener("mouseup", onMouseUp);
    removeEventListener("mouseleave", onMouseUp);
  };

  beforeUpdate(() => {
    setTimeout(() => moveCarousel(null, 0.3, {}), 2000);
  });

  const moveCarousel = (e?: MouseEvent, movePercent?: number, opts?: {}) => {
    if (!mouseDown && movePercent === undefined) return;
    const carouselRect = carousel.getBoundingClientRect();
    const trackWidth = Object.values(track.childNodes).reduce(
      (total, i) => total + (i as HTMLElement).offsetWidth,
      0
    );
    const maxTranslate = trackWidth - carouselRect.width;
    movePercent = movePercent ? movePercent / 100 : -(e.movementX / 10);
    trackCoords.set(
      Math.min(
        Math.max($trackCoords + movePercent * -maxTranslate, -maxTranslate),
        0
      ),
      opts
    );
  };

  const imageHover = (e: MouseEvent) => {
    if (mouseDown) {
      previewActive = false;
      return;
    }
    const containerRect = container.getBoundingClientRect();
    let yOffset =
      e.clientY > window.innerHeight / 2
        ? -preview.height - DEFAULT_OFFSET
        : DEFAULT_OFFSET;
    let xOffset =
      e.clientX > window.innerWidth / 2
        ? -preview.width - DEFAULT_OFFSET
        : DEFAULT_OFFSET;
    previewCoords.set({
      x: e.clientX - containerRect.left + xOffset,
      y: e.clientY - containerRect.top + yOffset,
    });
    preview.src = (e.target as HTMLImageElement).src;
  }; //TODO ADD IMAGE ON HOVER
</script>

{#await sanity then}
  <div class="page-container" id="team" bind:this={container}>
    <img
      class="preview"
      class:active={previewActive}
      alt="Preview of the dental clinic track images"
      bind:this={preview}
      style={`top: ${$previewCoords.y}px; left: ${$previewCoords.x}px;`}
    />

    <div class="title">
      <h1>Meet the Team</h1>
    </div>
    <Card class="team-card glass">
      <img
        class="display"
        src={currMainImgSrc}
        on:mousemove={imageHover}
        on:mouseleave={() => (previewActive = false)}
        on:mouseenter={() => (previewActive = true)}
        on:focus={() => {}}
        alt="Staff at the dental clinic"
      />
      <div class="description">
        <h3>{teamInfo.slogan}</h3>
        <span />
        <p>{teamInfo.description}</p>
        <div class="carousel" bind:this={carousel} on:mousedown={onMouseDown}>
          <div
            class="track"
            bind:this={track}
            style={`transform: translateX(${$trackCoords}px);`}
          >
            {#each Array(5)
              .fill(null)
              .map((_, i) => i + 1) as _, i}
              <img
                class="service-backdrop-svg"
                src={`${randomImgSrc}?sig=${i}`}
                alt="Staff at the dental clinic"
                on:mousemove={imageHover}
                on:mouseleave={() => (previewActive = false)}
                on:mouseenter={() => (previewActive = true)}
                on:focus={() => {}}
                style={`cursor: url(${randomImgSrc}?sig=${i}), auto;`}
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
    position: relative;
    height: 100svh;
  }

  img {
    border-radius: var(--border-radius);
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
    max-height: 45%;
    margin-top: auto;
    overflow: hidden;
  }

  .carousel::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
    pointer-events: none;
    content: "";
    background: linear-gradient(-90deg, rgb(255 255 255) 10%, transparent 25%);
  }

  .preview {
    position: absolute;
    z-index: -20;
    max-width: 25rem;
    max-height: 25rem;
    opacity: 0;
    transition: opacity 150ms;
  }

  .preview.active {
    z-index: 20;
    visibility: visible;
    opacity: 1;
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
