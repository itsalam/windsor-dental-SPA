import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();
export function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function grad(p: number) {
  return noise2D(p, p) < 0.5 ? -1 : 1;
}

export function noise(p: number) {
  const p0 = Math.floor(p);
  const p1 = p0 + 1;
  const g0 = grad(p0);
  const g1 = grad(p1);
  const t = p - p0;
  return (1 - fade(t)) * g0 * t + fade(t) * g1 * (p - p1);
  //   return (1 - fade(t)) * g1 + fade(t) * g0;
}
