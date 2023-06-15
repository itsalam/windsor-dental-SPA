<script lang="ts">
  import { T } from "@threlte/core";
  import {
    HTML
  } from "@threlte/extras";
  import { tweened } from "svelte/motion";
  import { followElement } from "~/utils/three";
  import Sprites from "./Sprites.svelte";

  const DEFAULT_MIN_Y = -80;
  const DEFAULT_MAX_Y = -100;

  export let getAssetSrc: () => string;
  let yBounds = [DEFAULT_MIN_Y, DEFAULT_MAX_Y];
  let positionY = tweened(yBounds[0], { duration: 400 });
  followElement("#teams-page", yBounds, positionY, (v) => positionY = v);

</script>

<T.Group position={[0, $positionY, 0]}>
  <Sprites
    {getAssetSrc}
  />
  <HTML class="backdrop"
    position={[-13, -2, -5]}
    transform
    scale={1} />
</T.Group>

<style>

</style>
