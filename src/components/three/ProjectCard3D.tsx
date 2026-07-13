"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// We keep these props in the interface so it doesn't break ProjectsSection, 
// but we only actually need the imageUrl for the 3D card itself.
interface ProjectCard3DProps {
  title?: string;
  tech?: string[];
  index?: number;
  imageUrl: string; 
}

function ImageCard({
  imageUrl,
  hovered,
  onHover,
}: {
  imageUrl: string;
  hovered: boolean;
  onHover: (v: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  // Load the image texture from the public folder
  const texture = useTexture(imageUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRot.current.x,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRot.current.y,
        0.1
      );
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (meshRef.current) {
      const x = (e.intersections[0].uv?.x || 0.5) - 0.5;
      const y = (e.intersections[0].uv?.y || 0.5) - 0.5;
      targetRot.current = { x: -y * 0.5, y: x * 0.5 };
    }
  };

  const handlePointerLeave = () => {
    targetRot.current = { x: 0, y: 0 };
    onHover(false);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[4, 2.5]} />
      <meshStandardMaterial
        map={texture}
        color={hovered ? "#888888" : "#ffffff"} 
        roughness={0.2}
        metalness={0.4}
      />
      {/* Subtle glowing border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.05, 2.55]} />
        <meshBasicMaterial 
            color={hovered ? "#e94560" : "#333333"} 
            transparent 
            opacity={0.8} 
        />
      </mesh>
    </mesh>
  );
}

// We only destructure imageUrl here to satisfy the strict linter
export default function ProjectCard3D({ imageUrl }: ProjectCard3DProps) {
  const [hovered, setHovered] = useState(false);

  const safeImageUrl = imageUrl || "/Team_Hub.png"; 

  return (
    <div className="h-[350px] w-full relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }} 
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        
        <Suspense fallback={null}>
          <ImageCard 
            imageUrl={safeImageUrl} 
            hovered={hovered} 
            onHover={setHovered} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}