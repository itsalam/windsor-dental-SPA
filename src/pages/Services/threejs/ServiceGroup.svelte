<script lang="ts">
  import { T } from "@threlte/core";
  import { tweened } from "svelte/motion";
  import { followElement } from "~/utils/three";
  import Sprites from "./Sprites.svelte";

  const DEFAULT_MIN_Y = -35;
  const DEFAULT_MAX_Y = -45;
  const Y_OFFSET = 0;

  export let getAssetSrc: (arg: string) => string;
  let yBounds = [DEFAULT_MIN_Y, DEFAULT_MAX_Y];
  let positionY = tweened(yBounds[0], { duration: 400 });
  followElement("#services", yBounds, positionY, (v) => (positionY = v));
</script>

<T.Group position={[2, $positionY - Y_OFFSET, 0]}>
  <Sprites {getAssetSrc} />
</T.Group>
<!-- <HTML class="backdrop"
  position={[-40, -35, -60]}
  transform
  scale={5}>
  <Svg class="service-backdrop-svg" src={getAssetSrc("backdrop-hero")} />
</HTML> -->
