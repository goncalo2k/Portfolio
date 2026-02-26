import { useMemo } from "react";
import type { JSX } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type DeskProps = JSX.IntrinsicElements["group"] & {
  /** desired desk width in scene units */
  width?: number;
};

export function Desk({ width = 6.5, ...groupProps }: DeskProps) {
  const gltf = useGLTF("/models/desk.glb");

  const deskModel = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    let scale = 1;
    if (size.x > 0) {
      scale = width / size.x;
      clone.scale.setScalar(scale);
    }

    const scaledCenter = center.clone().multiplyScalar(scale);
    const scaledMin = box.min.clone().multiplyScalar(scale);
    clone.position.set(-scaledCenter.x, -scaledMin.y, -scaledCenter.z);

    clone.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((mat) => {
          if (!mat) return;
          if (mat.userData.__baseOpacity === undefined) {
            mat.userData.__baseOpacity = mat.opacity ?? 1;
          }
          mat.transparent = true;
          mat.needsUpdate = true;
        });
      }
    });

    return clone;
  }, [gltf.scene, width]);

  return (
    <group {...groupProps}>
      <primitive object={deskModel} />
    </group>
  );
}

useGLTF.preload("/models/desk.glb");
