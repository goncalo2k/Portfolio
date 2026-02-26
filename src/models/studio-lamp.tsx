import { useMemo } from "react";
import type { JSX } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type StudioLampProps = JSX.IntrinsicElements["group"] & {
  /** desired lamp height normalization */
  height?: number;
};

export function StudioLamp({ height = 2, ...groupProps }: StudioLampProps) {
  const gltf = useGLTF("/models/lamp.glb");

  const lampModel = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    if (size.y > 0) {
      const scale = height / size.y;
      clone.scale.setScalar(scale);
      const scaledCenter = center.multiplyScalar(scale);
      const scaledMin = box.min.multiplyScalar(scale);
      clone.position.set(-scaledCenter.x, -scaledMin.y, -scaledCenter.z);
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
  }, [gltf.scene, height]);

  return (
    <group {...groupProps}>
      <primitive object={lampModel} />
    </group>
  );
}

useGLTF.preload("/models/lamp.glb");
