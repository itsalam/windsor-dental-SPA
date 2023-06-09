<script lang="ts">
  import Canvas from "./components/Canvas.svelte";
  import Toolbar from "./components/Toolbar.svelte";
  import Hero from "./pages/Hero/Hero.svelte";
  import Services from "./pages/Services/Services.svelte";
  import { sanity } from "./store/client";

  const loadPromise = Promise.all([
    sanity,
    new Promise((r) => setTimeout(r, 1000)),
  ]);
</script>

{#await loadPromise}
  <main>
    <progress />
  </main>
{:then}
  <Toolbar />
  <main>
    <Hero />
    <Services />
    <Canvas />
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
