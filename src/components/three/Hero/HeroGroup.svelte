<script lang="ts">
  import { T } from "@threlte/core";
  import Lines from "./Lines.svelte";
  import Sprites from "./Sprites.svelte";

  export let getAssetSrc: () => string;
  export let isWide;
</script>

<T.Group position={isWide? [-10, 0, 0]: [0 ,0 ,0]}>
  <Sprites
    {getAssetSrc}
  />
  <Lines />
</T.Group>
