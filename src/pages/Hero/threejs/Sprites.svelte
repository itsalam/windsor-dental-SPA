<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { Float, HTML, interactivity, transitions } from "@threlte/extras";
  import { onMount } from "svelte/internal";
  import { Vector3 } from "three";
  import { degToRad } from "three/src/math/MathUtils";
  import Svg from "~/components/Svg.svelte";
  import { fade, loadData, type MeshArgs, type Position } from "~/utils/three";

  interactivity();
  transitions();

  const SCALE = 0.03;
  const MAX_ROTATION = 60;
  const HALFTONE_SCALE = 2;

  export let getAssetSrc: (arg: string) => string;

  let halftoneSvg: string;
  let pointsLoaded = false;
  let lineSpriteMeshs: MeshArgs[] = [];
  let spriteMeshs: MeshArgs[] = [];
  let sparkleMeshs: MeshArgs[] = [];

  const spritePoint = new Vector3(5.5, -1.0, 1);
  const linePoints: Vector3[] = [
    new Vector3(-2, 3, 1),
    new Vector3(4, 2, 1),
    new Vector3(0.8, 6.75, 1),
    new Vector3(5.4, 6.75, 1),
  ];
  const halfTonesPosArr: Position[] = [
    [0, -4, -20],
    [-9.5, 3.5, -20],
  ];

  let spriteRotations = [];
  let dn = Date.now();

  $: if (linePoints.length > 0 && !pointsLoaded) {
    spriteRotations = linePoints.map(() =>
      degToRad(Math.random() * MAX_ROTATION - MAX_ROTATION / 2)
    );
    pointsLoaded = true;
  }

  onMount(() => {
    loadData(getAssetSrc("tooth"), lineSpriteMeshs, SCALE, () => {
      lineSpriteMeshs.forEach((lineSpriteMesh) => {
        lineSpriteMesh.material.opacity = 0;
      });
      lineSpriteMeshs = [...lineSpriteMeshs];
    });
    loadData(getAssetSrc("sparkle"), sparkleMeshs, SCALE, () => {
      sparkleMeshs = [...sparkleMeshs];
    });
    loadData(getAssetSrc("toothbrush"), spriteMeshs, SCALE, () => {
      spriteMeshs = [...spriteMeshs];
    });
  });

  const getStarPos = (position: Position, offset = 0.8): Position => {
    const x = position[0] + Math.random() * offset - offset / 2;
    const y = position[1] + Math.random() * offset - offset / 2;
    return [x, y, position[2]];
  };

  useFrame(() => {
    dn = Date.now();
  });
  halftoneSvg = getAssetSrc("halftone");
  const onSpritePointerOver = () => {};
</script>

<Float floatIntensity={3} scale={1} rotationIntensity={0}>
  {#each linePoints as position, i}
    <T.Group>
      {#each sparkleMeshs as sparkleMesh}
        <T.Mesh
          {...sparkleMesh}
          position={getStarPos([position.x, position.y, 1], 2)}
          scale={degToRad(Math.sin(dn / 700 + i * 900))}
          transition={fade({ delay: 7050, duration: 600 })}
        />
        <T.Mesh
          {...sparkleMesh}
          position={getStarPos([position.x, position.y, 1], 3)}
          scale={degToRad(Math.sin(dn / 700 + i * 1300))}
          transition={fade({ delay: 7050, duration: 600 })}
        />
      {/each}
      {#each lineSpriteMeshs as spriteMesh}
        <T.Mesh
          {...spriteMesh}
          position={[position.x, position.y, 0]}
          rotation={[0, 0, spriteRotations[i]]}
          transition={fade({ delay: 2050, duration: 600 })}
          on:pointerover={onSpritePointerOver}
        />
      {/each}
    </T.Group>
  {/each}
  <T.Group>
    {#each spriteMeshs as spriteMesh}
      <T.Mesh
        {...spriteMesh}
        position={[spritePoint.x, spritePoint.y, 0.5]}
        rotation={[0, degToRad(180), 0]}
        in={fade({ delay: 2050, duration: 600 })}
      />
    {/each}
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
