<script lang="ts">
  import { T } from "@threlte/core";
  import Lines from "./Lines.svelte";
  import Sprites from "./Sprites.svelte";

  export let getAssetSrc: (arg: string) => string;
  export let isWide: boolean;
</script>

<T.Group position={isWide? [-10, -2.5, 0]: [0 , -2.5 ,0]}>
  <Sprites
    {getAssetSrc}
  />
  <Lines />
</T.Group>
