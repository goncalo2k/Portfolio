import { useMemo } from "react";
import type { JSX } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type StudioCarpetProps = JSX.IntrinsicElements["group"] & {
  width?: number;
};

export function StudioCarpet({ width = 4, ...groupProps }: StudioCarpetProps) {
  const gltf = useGLTF("/models/carpet.glb");

  const carpetModel = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    if (size.x > 0) {
      const scale = width / size.x;
      clone.scale.setScalar(scale);
      const scaledCenter = center.multiplyScalar(scale);
      const scaledMinY = box.min.y * scale;
      clone.position.set(-scaledCenter.x, -scaledMinY, -scaledCenter.z);
    }

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
      <primitive object={carpetModel} />
    </group>
  );
}

useGLTF.preload("/models/carpet.glb");
