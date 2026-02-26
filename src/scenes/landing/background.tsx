import { forwardRef, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

import { Desk } from "../../models/desk";
import { StudioWindow } from "../../models/studio-window";
import { StudioBlinds } from "../../models/studio-blinds";
import { StudioShelf } from "../../models/studio-shelf";
import { StudioCandles } from "../../models/studio-candles";
import { StudioLamp } from "../../models/studio-lamp";
import { StudioCarpet } from "../../models/studio-carpet";

export const WALL_Z = -4.4;
export const PANEL_Z = -3.85;
export const BASEBOARD_Z = -3.8;
export const WINDOW_BACKDROP_Z = -4.2;
export const WINDOW_OPENING_Z = -3.7;
export const BACKGROUND_DEPTH_OFFSET = 0.45;

export const WINDOW_POSITION: [number, number, number] = [0, 0.5, WINDOW_OPENING_Z];
export const BLINDS_POSITION: [number, number, number] = [0, 0.5, WINDOW_OPENING_Z + 0.3];
export const SHELF_POSITION: [number, number, number] = [-2.8, -1.4, WINDOW_OPENING_Z - 0.2];
export const CANDLES_POSITION: [number, number, number] = [-1.6, 0, WINDOW_OPENING_Z - 0.2];

export const DESK_POSITION: [number, number, number] = [0, -1.5, -3];
export const LAMP_POSITION: [number, number, number] = [1.5, -1.45, -3.15];
export const CARPET_POSITION: [number, number, number] = [0, -1.72, -3.05];
export const LAMP_BULB_POSITION: [number, number, number] = [
  LAMP_POSITION[0] - 0.05,
  LAMP_POSITION[1] + 1.55,
  LAMP_POSITION[2] + 0.02,
];
export const CEILING_LIGHT_POSITION: [number, number, number] = [-0.08, 1.65, -0.35];

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

export const createLandingBackgroundMaterials = () => ({
  wallMat: createWallMaterial("#23262d"),
  wallPanelMat: createWallMaterial("#1d1f27", 0.85, 0.02),
  windowBackdropMat: createWallMaterial("#0d111a", 0.95, 0.02),
  baseboardMat: createWallMaterial("#32323b", 0.7, 0.02),
});

export const createWindowMaskMaterial = () =>
  new THREE.ShaderMaterial({
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

type LandingBackgroundProps = ReturnType<typeof createLandingBackgroundMaterials> & {
  windowMaskMat: THREE.ShaderMaterial;
  lampLightRef: MutableRefObject<THREE.PointLight | null>;
};

export const LandingBackground = forwardRef<THREE.Group, LandingBackgroundProps>(
  function LandingBackground(
    { wallMat, wallPanelMat, windowBackdropMat, baseboardMat, windowMaskMat, lampLightRef },
    ref
  ) {
    return (
      <group ref={ref}>
        <mesh position={[0, -0.1, WALL_Z - BACKGROUND_DEPTH_OFFSET]} material={wallMat}>
          <planeGeometry args={[11, 7]} />
        </mesh>
        {Array.from({ length: 5 }).map((_, idx) => (
          <mesh
            key={`panel-${idx}`}
            position={[0, -1.6 + idx * 0.95, PANEL_Z - BACKGROUND_DEPTH_OFFSET]}
            material={wallPanelMat}
          >
            <boxGeometry args={[11, 0.3, 0.05]} />
          </mesh>
        ))}
        <mesh position={[0, -2.8, BASEBOARD_Z - BACKGROUND_DEPTH_OFFSET]} material={baseboardMat}>
          <boxGeometry args={[11, 0.25, 0.1]} />
        </mesh>
        <mesh position={[0, 0.55, WINDOW_BACKDROP_Z - BACKGROUND_DEPTH_OFFSET]} material={windowBackdropMat}>
          <planeGeometry args={[7.5, 5.3]} />
        </mesh>
        <mesh position={[0, 0.4, WINDOW_OPENING_Z - BACKGROUND_DEPTH_OFFSET]} material={windowMaskMat} renderOrder={-1}>
          <planeGeometry args={[7, 5]} />
        </mesh>
        <StudioWindow position={WINDOW_POSITION} rotation={[0, Math.PI / 2, 0]} width={0.25} />
        <StudioBlinds position={BLINDS_POSITION} rotation={[0, Math.PI, 0]} width={1} />
        <StudioShelf position={SHELF_POSITION} rotation={[0, Math.PI, 0]} width={3} />
        <StudioCandles position={CANDLES_POSITION} rotation={[0, Math.PI, 0]} width={0.4} />
        <StudioLamp position={LAMP_POSITION} rotation={[0, Math.PI, 0]} height={2.3} />
        <pointLight
          color="#ffd7ad"
          position={LAMP_BULB_POSITION}
          intensity={1.35}
          distance={2.6}
          decay={2.15}
        />
        <pointLight
          color="#ffe8c8"
          position={CEILING_LIGHT_POSITION}
          intensity={0.4}
          distance={2.6}
          decay={2}
        />
        <StudioCarpet position={CARPET_POSITION} rotation={[0, Math.PI, 0]} width={4.5} />
        <group position={[0.03, 1.95, -3.3]}>
          <pointLight
            ref={lampLightRef}
            color="#f7c58b"
            intensity={1.35}
            distance={5.2}
            decay={2}
          />
        </group>
        <Desk position={DESK_POSITION} rotation={[0, Math.PI, 0]} scale={[0.38, 0.38, 0.52]} />
      </group>
    );
  }
);

export function LandingBackgroundFallback() {
  const lampLightRef = useRef<THREE.PointLight>(null);
  const materials = useMemo(() => createLandingBackgroundMaterials(), []);
  const windowMaskMat = useMemo(() => createWindowMaskMaterial(), []);
  return (
    <>
      <LandingBackground
        ref={null}
        lampLightRef={lampLightRef}
        windowMaskMat={windowMaskMat}
        {...materials}
      />
      <ambientLight color="#2a1a14" intensity={0.32} />
      <directionalLight color="#ffd9a6" position={[1.8, 2.5, 1]} intensity={0.7} />
      <Environment preset="sunset" />
    </>
  );
}
