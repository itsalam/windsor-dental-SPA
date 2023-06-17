<script lang="ts">
  import { T } from "@threlte/core";
  import { tweened } from "svelte/motion";
  import { followElement } from "~/utils/three";
  import Sprites from "./Sprites.svelte";

  const DEFAULT_MIN_Y = -35;
  const DEFAULT_MAX_Y = -45;

  export let getAssetSrc: (arg: string) => string;
  let yBounds = [DEFAULT_MIN_Y, DEFAULT_MAX_Y];
  let positionY = tweened(yBounds[0], { duration: 400 });
  followElement("#services-page", yBounds, positionY, (v) => positionY = v);

</script>

<T.Group position={[0, $positionY, 0]}>
  <Sprites
    {getAssetSrc}
  />
</T.Group>
