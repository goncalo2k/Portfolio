import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";

import './landing.scss';
import { Desk } from "../../models/desk";

type LandingIntroProps = {
  onFinish?: () => void;
};

type IntroSceneProps = {
  onDone?: () => void;
  progressRef: React.MutableRefObject<number>;
};

function IntroScene({ onDone, progressRef }: IntroSceneProps) {
  const group = useRef<THREE.Group>(null);
  const cameraRig = useRef<THREE.Group>(null);
  const flashPlane = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null>(null);
  const sceneryGroup = useRef<THREE.Group>(null);
  const lastSceneryFade = useRef(1);
  const lampLightRef = useRef<THREE.PointLight>(null);
  const modelsHiddenRef = useRef(false);
  const doneTriggeredRef = useRef(false);

  const t0 = useRef<number>(performance.now());
  const { camera, size } = useThree();
  const topCameraPosition = useMemo(() => new THREE.Vector3(-0.18, 1.05, 0.2), []);
  const topCameraTarget = useMemo(() => new THREE.Vector3(-0.25, -0.4, -2.8), []);
  const finalCameraPosition = useMemo(() => new THREE.Vector3(0, 0.85, 0.9), []);
  const finalCameraTarget = useMemo(() => new THREE.Vector3(0, -0.25, -1.6), []);
  const tempCameraPos = useRef(new THREE.Vector3());
  const tempCameraTarget = useRef(new THREE.Vector3());
  const flashDir = useRef(new THREE.Vector3());
  const flashPos = useRef(new THREE.Vector3());

  const cameraGLTF = useGLTF("/models/camera.glb");
  const createWallMaterial = (
    color: string,
    roughness = 0.9,
    metalness = 0.05
  ) => {
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
    mat.userData.__baseOpacity = mat.opacity ?? 1;
    mat.transparent = true;
    return mat;
  };

  const cameraModel = useMemo(() => {
    const clone = cameraGLTF.scene.clone(true);
    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    clone.position.set(-center.x, -center.y, -center.z);
    if (size.y > 0) {
      const targetHeight = 1;
      const scale = targetHeight / size.y;
      clone.scale.setScalar(scale);
    }
    clone.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => (mat.needsUpdate = true));
        } else if (obj.material) {
          obj.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [cameraGLTF.scene]);


  const windowMaskMat = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color("#04050a") },
        uOpacity: { value: 1 },
        uRect: { value: new THREE.Vector4(0.38, 0.44, 0.6, 0.96) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform vec4 uRect;
        uniform float uOpacity;
        void main() {
          bool insideX = vUv.x > uRect.x && vUv.x < uRect.z;
          bool insideY = vUv.y > uRect.y && vUv.y < uRect.w;
          if (insideX && insideY) discard;
          gl_FragColor = vec4(uColor, uOpacity);
        }
      `,
    });
    return mat;
  }, []);

  const wallMat = useMemo(() => createWallMaterial("#23262d"), []);
  const wallPanelMat = useMemo(() => createWallMaterial("#1d1f27", 0.85, 0.02), []);
  const baseboardMat = useMemo(() => createWallMaterial("#32323b", 0.7, 0.02), []);

  const flashMat = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("white"),
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    return mat;
  }, []);

  const applyFadeToGroup = (
    target: THREE.Group | null,
    fade: number,
    lastRef: React.MutableRefObject<number>
  ) => {
    if (!target) return;
    const clamped = Math.max(0, Math.min(1, fade));
    if (clamped <= 0.02) {
      target.visible = false;
      lastRef.current = 0;
      return;
    }
    target.visible = true;
    if (Math.abs(clamped - lastRef.current) < 0.02) return;
    lastRef.current = clamped;
    target.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((mat) => {
          if (!mat) return;
          if (mat.userData.__baseOpacity === undefined) {
            mat.userData.__baseOpacity = mat.opacity ?? 1;
          }
          mat.transparent = true;
          mat.opacity = (mat.userData.__baseOpacity ?? 1) * clamped;
          mat.needsUpdate = true;
        });
      }
    });
  };

  useFrame(() => {
    const t = (performance.now() - t0.current) / 1000; // seconds

    const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
    const easeInOutQuad = (x: number) =>
      x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeInOutCubic = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const easeOutBounce = (x: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (x < 1 / d1) return n1 * x * x;
      if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
      if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    };

    const fallDuration = 1.2;
    const flashStart = fallDuration + 0.1;
    const turnStart = flashStart + 0.15;
    const turnDuration = 0.95;
    const zoomStart = turnStart + turnDuration;
    const zoomDuration = 1.05;
    const totalDuration = zoomStart + zoomDuration + 0.35;

    // falling from the sky with a soft bounce
    const fall = clamp01(t / fallDuration);
    const fallE = easeOutBounce(fall);
    let dropY = THREE.MathUtils.lerp(4, 0, fallE);
    if (t > fallDuration) {
      const settle = t - fallDuration;
      dropY += Math.sin(settle * 9) * Math.exp(-settle * 3.2) * 0.25;
    }

    const idleFactor = 1 - clamp01((t - (turnStart - 0.15)) / 1.4);

    // subtle rig sway that fades as we zoom in
    if (cameraRig.current) {
      cameraRig.current.rotation.y = Math.sin(t * 1.1) * 0.08 * idleFactor;
      cameraRig.current.rotation.x = Math.sin(t * 0.9) * 0.04 * idleFactor;
    }

    // flash timeline (shutter snap)
    const flashUp = clamp01((t - flashStart) / 0.12);
    const flashDown = clamp01((t - (flashStart + 0.12)) / 0.4);

    let flash = 0;
    if (t >= flashStart && t < flashStart + 0.12) flash = easeInOutQuad(flashUp);
    else if (t >= flashStart + 0.12 && t < flashStart + 0.52)
      flash = 1 - easeInOutQuad(flashDown);

    if (flashPlane.current) {
      flashPlane.current.material.opacity = flash * 0.95;
      flashPlane.current.material.needsUpdate = false;
    }

    // turn the camera around to reveal the screen
    const turn = clamp01((t - turnStart) / turnDuration);
    const turnAngle = easeInOutCubic(turn) * Math.PI;

    // final zoom toward the viewer (checking the photo)
    const zoom = clamp01((t - zoomStart) / zoomDuration);
    const zoomE = easeInOutCubic(zoom);

    tempCameraPos.current
      .copy(topCameraPosition)
      .lerp(finalCameraPosition, zoomE);
    tempCameraTarget.current
      .copy(topCameraTarget)
      .lerp(finalCameraTarget, zoomE);
    camera.position.copy(tempCameraPos.current);
    camera.lookAt(tempCameraTarget.current);
    camera.updateProjectionMatrix();

    if (flashPlane.current) {
      const plane = flashPlane.current;
      const dist = 0.25;
      flashDir.current.set(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
      flashPos.current.copy(camera.position).addScaledVector(flashDir.current, dist);
      plane.position.copy(flashPos.current);
      plane.quaternion.copy(camera.quaternion);
      if (camera instanceof THREE.PerspectiveCamera) {
        const height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * dist;
        const width = height * (size.width / size.height);
        plane.scale.set(width, height, 1);
      }
    }

    if (group.current) {
      const g = group.current;
      const lift = THREE.MathUtils.lerp(0, 0.55, turn);
      const pitch = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(-35),
        THREE.MathUtils.degToRad(-5),
        easeOutCubic(fall)
      );
      g.position.set(0, dropY + lift, -1.8);
      g.rotation.x = pitch;
      g.rotation.y = turnAngle;
      g.rotation.z = Math.sin(t * 0.4) * 0.06 * (1 - zoomE);
      const scale = 0.78 + zoomE * 0.25;
      g.scale.set(scale, scale, scale);
    }

    progressRef.current = zoomE;

    if (!modelsHiddenRef.current && zoomE >= 0.50) {
      modelsHiddenRef.current = true;
      if (group.current) {
        group.current.visible = false;
        group.current.parent?.remove(group.current);
      }
      if (sceneryGroup.current) {
        sceneryGroup.current.visible = false;
        sceneryGroup.current.parent?.remove(sceneryGroup.current);
      }
      windowMaskMat.uniforms.uOpacity.value = 0;
      if (lampLightRef.current) lampLightRef.current.visible = false;
      progressRef.current = 1;
      if (!doneTriggeredRef.current) {
        doneTriggeredRef.current = true;
        onDone?.();
      }
    }

    const sceneryFadeStart = zoomStart + zoomDuration - 0.3;
    const sceneryFade = modelsHiddenRef.current
      ? 0
      : 1 - clamp01((t - sceneryFadeStart) / 0.5);
    if (!modelsHiddenRef.current) {
      applyFadeToGroup(sceneryGroup.current, sceneryFade, lastSceneryFade);
      windowMaskMat.uniforms.uOpacity.value = sceneryFade;
    }
    if (lampLightRef.current) {
      if (modelsHiddenRef.current) {
        lampLightRef.current.visible = false;
      } else {
        const pulse = 1 + Math.sin(t * 6.2) * 0.08;
        lampLightRef.current.intensity = 1.9 * sceneryFade * pulse;
      }
    }

    if (t > totalDuration && !doneTriggeredRef.current) {
      doneTriggeredRef.current = true;
      onDone?.();
    }
  });

  return (
    <>
      <group ref={sceneryGroup}>
        <mesh position={[0, -0.1, -3.9]} material={wallMat}>
          <planeGeometry args={[11, 7]} />
        </mesh>
        {Array.from({ length: 5 }).map((_, idx) => (
          <mesh
            key={`panel-${idx}`}
            position={[0, -1.6 + idx * 0.95, -3.85]}
            material={wallPanelMat}
          >
            <boxGeometry args={[11, 0.3, 0.05]} />
          </mesh>
        ))}
        <mesh position={[0, -2.8, -3.8]} material={baseboardMat}>
          <boxGeometry args={[11, 0.25, 0.1]} />
        </mesh>
        <mesh position={[0, 0.4, -3.7]} material={windowMaskMat} renderOrder={-1}>
          <planeGeometry args={[7, 5]} />
        </mesh>
        <group position={[0.03, 1.95, -3.3]}>
          <pointLight
            ref={lampLightRef}
            color="#f2c884"
            intensity={1.9}
            distance={6.5}
            decay={2}
          />
        </group>
        <Desk position={[0, -1.5, -3.3]} rotation={[0, Math.PI, 0]} scale={[0.38, 0.38, 0.52]} />
      </group>
      <group ref={cameraRig}>
        <group ref={group}>{cameraModel && <primitive object={cameraModel} />}</group>
      </group>

      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <Environment preset="city" />

      {/* flash plane close to the camera */}
      <mesh
        ref={(m) => {
          // ensure correct material typing (MeshBasicMaterial)
          flashPlane.current = m as unknown as THREE.Mesh<
            THREE.PlaneGeometry,
            THREE.MeshBasicMaterial
          > | null;
        }}
        position={[0, 0, 0.1]}
        renderOrder={999}
      >
        <planeGeometry args={[6, 6]} />
        <primitive object={flashMat} attach="material" />
      </mesh>
    </>
  );
}

useGLTF.preload("/models/camera.glb");

export default function LandingIntro({ onFinish }: LandingIntroProps) {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(true);
  const progressRef = useRef<number>(0);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => {
      setMounted(false);
      onFinish?.();
    }, 450);
    return () => window.clearTimeout(id);
  }, [done, onFinish]);

  if (!mounted) return null;

  const fade = done ? 1 : progressRef.current;
  const opacity = 1 - Math.min(1, fade);
  return (
    <div
      aria-hidden="true"
      className={`landing-intro${done ? " done" : ""}`}
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 0, 2.4], fov: 45 }}>
        <Suspense fallback={null}>
          <IntroScene onDone={() => setDone(true)} progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
