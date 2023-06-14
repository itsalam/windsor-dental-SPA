<script lang="ts">
  import Canvas from "./components/Canvas.svelte";
  import Toolbar from "./components/Toolbar.svelte";
  import Hero from "./pages/Hero/Hero.svelte";
  import HeroGroup from "./pages/Hero/threejs/HeroGroup.svelte";
  import Services from "./pages/Services/Services.svelte";
  import ServiceGroup from "./pages/Services/threejs/ServiceGroup.svelte";
  import Team from "./pages/Team/Team.svelte";
  import TeamGroup from "./pages/Team/threejs/TeamGroup.svelte";
  import { sanity } from "./store/client";


  let getAssetSrc: () => string;
  sanity.then((data) => {
    data.subscribe((value) => {
      getAssetSrc = value.getAssetSrc;
    });
  });

  let innerWidth;
  let innerHeight;
  let pageHeights = [];
  $: isWide = innerWidth > 992

  const loadPromise = Promise.all([
    sanity,
    new Promise((r) => setTimeout(r, 1000)),
  ]);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#await loadPromise}
  <main>
    <progress />
  </main>
{:then}
  <Toolbar />
  <main>
    <Hero bind:clientHeight={pageHeights[0]} />
    <Services bind:clientHeight={pageHeights[1]} />
    <Team bind:clientHeight={pageHeights[2]} />
    <Canvas> 
      <HeroGroup {getAssetSrc} {isWide} />
      <ServiceGroup {getAssetSrc} {isWide} serviceHeight={pageHeights[1]} />
      <TeamGroup {getAssetSrc} {isWide} />
    </Canvas>
  </main>
{/await}

<style>
  progress {
    position: absolute;
    height: 2px;
    padding: 0px;
    margin: 0px;
  }
</style>
