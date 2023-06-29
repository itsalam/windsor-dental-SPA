<script lang="ts">
  import { tweened } from "svelte/motion";
  import BookingModal from "./components/Booking/BookingModal.svelte";
  import Canvas from "./components/Canvas.svelte";
  import Toolbar from "./components/Toolbar.svelte";
  import Faq from "./pages/FAQ/FAQ.svelte";
  import FaqGroup from "./pages/FAQ/threejs/FaqGroup.svelte";
  import Footer from "./pages/Footer.svelte";
  import Hero from "./pages/Hero/Hero.svelte";
  import HeroGroup from "./pages/Hero/threejs/HeroGroup.svelte";
  import Services from "./pages/Services/Services.svelte";
  import ServiceGroup from "./pages/Services/threejs/ServiceGroup.svelte";
  import Team from "./pages/Team/Team.svelte";
  import TeamGroup from "./pages/Team/threejs/TeamGroup.svelte";
  import { sanity } from "./store/client";

  let getAssetSrc: (arg: string) => string;
  let progress = tweened(0, { duration: 400 });
  sanity.subscribe((value) => {
    getAssetSrc = value.getAssetSrc;
    setTimeout(() => {
      progress.set(value.progress);
    }, 200);
  });

  let innerWidth: number;
  let innerHeight: number;

  const loadPromise = Promise.all([
    new Promise((r) => setTimeout(r, 1000)),
    new Promise<void>((r) => {
      progress.subscribe((v) => {
        if (v === 1) r();
      });
    }),
  ]);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#await loadPromise}
  <main class="loading">
    <progress value={$progress} max="1" />
    <h1 class="loading-title">{Math.trunc($progress * 100)}%</h1>
  </main>
{:then}
  <Toolbar />
  <main>
    <Hero />
    <Services />
    <Team />
    <Faq />
    <Canvas>
      <HeroGroup {getAssetSrc} />
      <ServiceGroup {getAssetSrc} />
      <TeamGroup {getAssetSrc} />
      <FaqGroup {getAssetSrc} />
    </Canvas>
    <Footer />
  </main>
  <BookingModal />
{/await}

<style>
  .loading {
    height: 100vh;
  }

  .loading-title {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0.75;
    transform: translate(-50%, -50%);
  }

  progress {
    position: absolute;
    height: 2px;
    padding: 0;
    margin: 0;
  }
</style>
