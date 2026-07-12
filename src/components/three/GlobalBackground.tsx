"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function GlobalSwarm({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree(); 

  // Track global mouse and scroll positions
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const scrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    // Initialize scroll position on load
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Track time manually to avoid THREE.Clock deprecation warnings
    timeRef.current += delta;
    const time = timeRef.current;

    // Mouse target mapping
    const targetX = (mousePos.current.x * viewport.width) / 2;
    const targetY = (mousePos.current.y * viewport.height) / 2;

    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, targetX, 0.05);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, targetY, 0.05);

    // Apply scroll-based rotation and lift
    const scrollOffset = scrollY.current * 0.001;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      scrollOffset * 0.8,
      0.05
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      scrollOffset * 2, 
      0.05
    );

    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttribute.array as Float32Array;
    const velArray = velocitiesRef.current;
    const offArray = offsetsRef.current;
    
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

export default function GlobalBackground() {
  return (
    // 'fixed' ensures it stays put behind all scrolling content
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <fog attach="fog" args={["#050505", 5, 25]} />
        <GlobalSwarm count={2000} />
      </Canvas>
    </div>
  );
}