import { useFrame, useThrelte } from "@threlte/core";
import { createTransition } from "@threlte/extras";
import type {
  ThrelteTransition,
  ThrelteTransitionConfig,
} from "@threlte/extras/dist/transitions/types";
import { beforeUpdate } from "svelte";
import { cubicOut } from "svelte/easing";
import { tweened, type Tweened } from "svelte/motion";
import {
  Color,
  DoubleSide,
  Material,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  ShapeGeometry,
  Vector3,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import inView from "./actions";

const loader = new SVGLoader();

export type Position = [x: number, y: number, z: number];

export const fade = (config?: ThrelteTransitionConfig) =>
  createTransition<Mesh>((ref) => {
    const materials: Material[] =
      ref.material instanceof Material ? [ref.material] : ref.material;
    return {
      tick(t) {
        materials.forEach((material) => (material.opacity = t));
      },
      easing: cubicOut,
      duration: 1000,
      ...config,
    };
  });

export type MeshArgs = {
  geometry: ShapeGeometry;
  material: MeshBasicMaterial;
  transition?: ThrelteTransition<any>;
};

export const loadData = (
  spriteSrc: string,
  spritemeshArr: { geometry: ShapeGeometry; material: MeshBasicMaterial }[],
  scale: number,
  callback: () => any,
  setDefaultColor?: boolean
) =>
  loader.load(
    spriteSrc,
    (data) => {
      const paths = data.paths;
      let maxGeoSize = new Vector3(0, 0, 0);
      for (let path of paths) {
        let depthWrite = false;
        if (path.color.getHex() === 0 || setDefaultColor) {
          path.color = new Color(
            parseInt(
              getComputedStyle(document.documentElement)
                .getPropertyValue("--primary")
                .replace(/^#/, ""),
              16
            )
          );
          depthWrite = true;
        }
        const material = new MeshBasicMaterial({
          color: path.color,
          depthWrite,
          side: DoubleSide,
          transparent: true,
        });
        const shapes = SVGLoader.createShapes(path);
        const matrix = new Matrix4().makeScale(-scale, -scale, -scale);

        for (let shape of shapes) {
          const geometry = new ShapeGeometry(shape);
          geometry.applyMatrix4(matrix);
          geometry.computeBoundingBox();
          const currSize = geometry.boundingBox.getSize(new Vector3(0, 0, 0));
          if (currSize.length() > maxGeoSize.length()) {
            maxGeoSize = currSize;
          }
          spritemeshArr.push({ geometry, material });
        }
      }
      for (let spriteMesh of spritemeshArr) {
        spriteMesh.geometry.translate(
          maxGeoSize.x / 2,
          maxGeoSize.y / 2,
          -maxGeoSize.z / 2
        );
      }
      callback();
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

export function followElement(
  nodeQuery: string,
  yBounds: number[],
  positionY: Tweened<number> = tweened(0),
  callBack: (positionY: Tweened<number>) => void
) {
  let observerLoaded = false;
  const { camera } = useThrelte();

  useFrame(() => {
    if (
      yBounds[0] > camera.current.position.y &&
      yBounds[1] < camera.current.position.y
    ) {
      positionY.set(camera.current.position.y);
      callBack(positionY);
    } else {
      const closestBound =
        yBounds[0] < camera.current.position.y ? yBounds[0] : yBounds[1];
      positionY.set(closestBound);
      callBack(positionY);
    }
  });

  const calcYbounds = (target: Element) => {
    const top = window.scrollY + target.getBoundingClientRect().top;
    return [
      (-top * 30) / window.innerHeight,
      (-(top + target.getBoundingClientRect().height - window.innerHeight) *
        30) /
        window.innerHeight,
    ];
  };

  const observeNode = async () => {
    let serviceNode = document.querySelector(nodeQuery);
    while (!serviceNode) {
      await new Promise((r) => setTimeout(r, 100));
      serviceNode = document.querySelector(nodeQuery);
    }
    yBounds = calcYbounds(serviceNode);
    inView(document.querySelector("main"), () => {
      yBounds = calcYbounds(serviceNode);
    });
  };

  beforeUpdate(() => {
    if (!observerLoaded) {
      observeNode();
      observerLoaded = true;
    }
  });

  return positionY;
}
