<script lang="ts">
  import { T } from "@threlte/core";
  import { type Position } from "~/utils/three";
  import Lines from "./Lines.svelte";
  import Sprites from "./Sprites.svelte";

  export let getAssetSrc: (arg: string) => string;

  let innerWidth: number;
  let innerHeight: number;
  $: cameraPos = (
    innerWidth > innerHeight ? [-10, -2.5, 0] : [0, -5.5, -10]
  ) as Position;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<T.Group position={cameraPos}>
  <Sprites {getAssetSrc} />
  <Lines />
</T.Group>
