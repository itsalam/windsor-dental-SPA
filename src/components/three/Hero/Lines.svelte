<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { InstancedMesh, interactivity } from "@threlte/extras";
  import {
    BufferGeometry,
    CatmullRomCurve3,
    LineBasicMaterial,
    Vector3,
  } from "three";
  import { noise } from "~/utils/noise";
  type NoiseParams = {
    frequency: number;
    amplitude: number;
    timeFrequency: number;
  };
  // Main Constants
  const NUM_LINES = 2;

  // Noise Wave Constants
  const NOISE_PARAMS: NoiseParams[] = [
    { frequency: 1, amplitude: 2, timeFrequency: 0.333 },
    { frequency: 4, amplitude: 7, timeFrequency: 0.04 },
    { frequency: 25, amplitude: 5, timeFrequency: 0.25 },
  ];

  // Running Line Constants
  const LINE_OFFSET = 0.8;
  const TOTAL_POINTS = 400;
  const RUNNING_TIME = 14;
  const DELAY_TIME = 4;
  const TOTAL_TIME = DELAY_TIME + RUNNING_TIME;
  const LINE_LENGTH = 200;

  interactivity();
  const curvePoints = [
    new Vector3(-25, -15, 0),
    new Vector3(-7, 0, -3),
    new Vector3(-2, 3, -3),
    new Vector3(4, 1, 3),
    new Vector3(5, 1, -2),
    new Vector3(2, 5, 2),
    new Vector3(-1.5, 6, 0),
    new Vector3(2, 7, -5),
    new Vector3(6.5, 5, 0),
    new Vector3(4, 8, 3),
    new Vector3(12, 10, 0),
    new Vector3(50, 15, 0),
  ];

  let curve = new CatmullRomCurve3(curvePoints);

  let points = curve.getPoints(50);

  const geometries: BufferGeometry[] = Array(NUM_LINES)
    .fill()
    .map(() => new BufferGeometry());
  const material = new LineBasicMaterial({
    color: 0xf7630c,
  });

  export let zPoints = [];
  const waveFunction = (time?: number) => (p: Vector3, i: number) => {
    const n = NOISE_PARAMS.reduce(
      (acc, { frequency, amplitude, timeFrequency }) =>
        acc +
          noise((i / points.length) * frequency + time * timeFrequency) *
          amplitude,
      0
    );
    const gradient = curve.getTangent(i / points.length);
    const vec3 = new Vector3(
      n * gradient.y * -1 * 0.15,
      n * gradient.x * 0.15,
      0
    );

    if (Math.abs(p.z) > 1.95 && p.x > -10 && p.x < 10) {
      zPoints.push(p.clone().add(vec3.clone().multiplyScalar(1)));
    }

    const newPoint = p.add(vec3);
    return newPoint;
  };

  const setLinePoints = (curve, offset, i, time) => {
    const geometry = new BufferGeometry();
    time -= TOTAL_TIME * offset * i;
    if (time % TOTAL_TIME < DELAY_TIME) {
      geometry.setFromPoints([]);
      return geometry;
    }
    const prog = ((time % TOTAL_TIME) - DELAY_TIME) / RUNNING_TIME;

    const start_index = Math.floor(prog * (TOTAL_POINTS + LINE_LENGTH));
    points = curve.getPoints(TOTAL_POINTS);
    geometry.setFromPoints(
      points.slice(Math.max(0, start_index - LINE_LENGTH), start_index)
    );
    return geometry;
  };

  useFrame((ctx) => {
    const newcurve = new CatmullRomCurve3(
      curve.getPoints(50).map(waveFunction(ctx.clock.elapsedTime))
    );
    geometries.forEach((geometry, i) => {
      geometry.copy(
        setLinePoints(newcurve, LINE_OFFSET, i, ctx.clock.elapsedTime)
      );
    });
  });
</script>

<T.Group>
  {#each geometries as geometry, i}
    <T.Line {material} {geometry} position={[0.25 * i, 0, 0]} />
  {/each}
  <InstancedMesh>
    <T.SphereGeometry />
    <T.MeshStandardMaterial />
    <!-- {#each curvePoints as point}
      <Instance position={[...point]} scale={0.2} />
      <Text
        position={[...point]}
        scale={0.2}
        text={`${point.x}, ${point.y}, ${point.z}`}
      />
    {/each} -->
  </InstancedMesh>
</T.Group>
