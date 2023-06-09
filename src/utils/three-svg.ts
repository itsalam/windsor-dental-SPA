import { createTransition } from "@threlte/extras";
import { cubicOut } from "svelte/easing";
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

const loader = new SVGLoader();

export const fade = createTransition<Mesh>((ref) => {
  const materials: Material[] =
    ref.material instanceof Material ? [ref.material] : ref.material;
  materials.forEach((material) => (material.transparent = true));
  return {
    tick(t) {
      materials.forEach((material) => (material.opacity = t));
    },
    easing: cubicOut,
    duration: 400,
  };
});

export const loadData = (spriteSrc, spritemeshArr, scale, callback) =>
  loader.load(
    spriteSrc,
    (data) => {
      const paths = data.paths;
      let maxGeoSize = new Vector3(0, 0, 0);
      for (let path of paths) {
        if (path.color.getHex() === 0) {
          path.color = new Color(
            parseInt(
              getComputedStyle(document.documentElement)
                .getPropertyValue("--primary")
                .replace(/^#/, ""),
              16
            )
          );
        }
        const material = new MeshBasicMaterial({
          color: path.color,
          depthWrite: false,
          side: DoubleSide,
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
