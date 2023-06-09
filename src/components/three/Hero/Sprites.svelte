<script lang="ts">
  import { T } from "@threlte/core";
  import {
    Float,
    HTML,
    interactivity,
    transitions
  } from "@threlte/extras";
  import { onMount } from "svelte/internal";
  import { Vector3 } from "three";
  import { degToRad } from "three/src/math/MathUtils";
  import Svg from "~/components/Svg.svelte";
  import { fade, loadData } from "~/utils/three-svg";

  interactivity();
  transitions();

  const SCALE = 0.03;
  const MAX_ROTATION = 50;
  const HALFTONE_SCALE = 2;
  const SHOW_COORD = false;

  
  export let getAssetSrc: () => string;
  
  let halftoneSvg: string;
  let pointsLoaded = false;
  let lineSpriteMeshs = [];
  let spriteMeshs = [];


  const spritePoint = new Vector3(5.5, -1.0, 1);
  const linePoints: Vector3[] = [
    new Vector3(-2, 3, 1),
    new Vector3(4, 1, 1),
    new Vector3(0.8, 6.2, 1),
    new Vector3(5.4, 5.75, 1),
  ];
  const halfTonesPosArr = [[0, -4, -20], [-9.5, 3.5, -20]]

  let rotations = []

  $: if (linePoints.length > 0 && !pointsLoaded) {
    rotations = linePoints.map(() =>
      degToRad(Math.random() * MAX_ROTATION - MAX_ROTATION / 2)
    );
    pointsLoaded = true;
  }

  onMount(() => {
    loadData(getAssetSrc("tooth"), lineSpriteMeshs, SCALE, () => {
      lineSpriteMeshs = [...lineSpriteMeshs];
    });
    loadData(getAssetSrc("toothbrush"), spriteMeshs, SCALE, () => {
      spriteMeshs = [...spriteMeshs];
    });
  });
  halftoneSvg = getAssetSrc("halftone");
  const onSpritePointerOver = () => {};
</script>

<Float
  floatIntensity={3}
  scale={1}
  rotationIntensity={0}
>
  {#each linePoints as position, i}
    <T.Group>
      {#each lineSpriteMeshs as spriteMesh}
        <T.Mesh
          {...spriteMesh}
          position={[position.x, position.y, 0]}
          rotation={[0, 0, rotations[i]]}
          transition={fade}
          on:pointerover={onSpritePointerOver}
        />
      {/each}
      {#if SHOW_COORD}
        <HTML position={[position.x, position.y, 5.5]}>
          <p>
            {`${position.x.toFixed(2)},${position.y.toFixed(
              2
            )},${position.z.toFixed(2)}`}
          </p>
        </HTML>
      {/if}
    </T.Group>
  {/each}

  <T.Group>
    {#each spriteMeshs as spriteMesh}
      <T.Mesh
        {...spriteMesh}
        position={[spritePoint.x, spritePoint.y, 0.5]}
        rotation={[0, degToRad(180), 0]}
      />
    {/each}

    {#if SHOW_COORD}
      <HTML position={[spritePoint.x, spritePoint.y, 5.5]}>
        <p>
          {`${spritePoint.x.toFixed(2)},${spritePoint.y.toFixed(
            2
          )},${spritePoint.z.toFixed(2)}`}
        </p>
      </HTML>
    {/if}
  </T.Group>
</Float>
{#each halfTonesPosArr as halfTonesPos}
  <HTML
    class="backdropGroup"
    position={halfTonesPos}
    scale={[HALFTONE_SCALE, HALFTONE_SCALE, HALFTONE_SCALE]}
    transform
  >
    <Svg src={halftoneSvg} class="halftoneSvg" />
  </HTML>
{/each}