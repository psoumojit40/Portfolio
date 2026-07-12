"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function SwarmCloud({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree(); 

  // Global mouse tracker to bypass HTML z-index blocking
  const mousePos = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to range from -1 to +1
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate initial arrays safely
  const initialData = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const offsets = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 30;
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // eslint-disable-next-line react-hooks/purity
      offsets[i * 3] = (Math.random() - 0.5) * 25; 
      // eslint-disable-next-line react-hooks/purity
      offsets[i * 3 + 1] = (Math.random() - 0.5) * 25; 
      // eslint-disable-next-line react-hooks/purity
      offsets[i * 3 + 2] = (Math.random() - 0.5) * 25; 

      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return { pos, vel, offsets };
  }, [count]);

  const velocitiesRef = useRef(initialData.vel);
  const offsetsRef = useRef(initialData.offsets);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(initialData.pos, 3)
    );
    return geo;
  }, [initialData.pos]);

  // FIX: Wrap currentTarget in a useRef
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const timeRef = useRef(0); // <--- ADD THIS LINE

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const targetX = (mousePos.current.x * viewport.width) / 2;
    const targetY = (mousePos.current.y * viewport.height) / 2;

    // FIX: Access via .current
    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, targetX, 0.05);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, targetY, 0.05);

    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttribute.array as Float32Array;
    const velArray = velocitiesRef.current;
    const offArray = offsetsRef.current;

    timeRef.current += delta;           // <--- ADD THIS
    const time = timeRef.current;
    
    const cos = Math.cos(time * 0.15);
    const sin = Math.sin(time * 0.15);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const px = posArray[i3];
      const py = posArray[i3 + 1];
      const pz = posArray[i3 + 2];

      const ox = offArray[i3];
      const oy = offArray[i3 + 1];
      const oz = offArray[i3 + 2];

      const rotatedOx = ox * cos - oz * sin;
      const rotatedOz = ox * sin + oz * cos;

      // FIX: Access via .current
      const tX = currentTarget.current.x + rotatedOx;
      const tY = currentTarget.current.y + oy;
      const tZ = currentTarget.current.z + rotatedOz;

      const dx = tX - px;
      const dy = tY - py;
      const dz = tZ - pz;

      velArray[i3] += dx * 0.012;
      velArray[i3 + 1] += dy * 0.012;
      velArray[i3 + 2] += dz * 0.012;

      velArray[i3] *= 0.88;
      velArray[i3 + 1] *= 0.88;
      velArray[i3 + 2] *= 0.88;

      posArray[i3] += velArray[i3];
      posArray[i3 + 1] += velArray[i3 + 1];
      posArray[i3 + 2] += velArray[i3 + 2];
    }

    positionsAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#e94560" 
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SceneBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <fog attach="fog" args={["#050505", 5, 25]} />
        <SwarmCloud count={2000} />
      </Canvas>
    </div>
  );
}