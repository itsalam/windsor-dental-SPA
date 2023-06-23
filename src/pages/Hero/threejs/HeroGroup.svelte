<script lang="ts">
  import { T } from "@threlte/core";
  import Lines from "./Lines.svelte";
  import Sprites from "./Sprites.svelte";

  export let getAssetSrc: (arg: string) => string;
  export let isWide: boolean;

  let innerWidth: number;
  let innerHeight: number;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<T.Group position={isWide ? [-10, -2.5, 0] : [0, -7.5, 10]}>
  <Sprites {getAssetSrc} />
  <Lines />
</T.Group>
