import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;
const CONNECTION_DISTANCE = 2.5;
// Pre-calculate maximum possible lines (n * (n - 1) / 2)
// We limit it practically to save memory, assuming not ALL particles connect at once
const MAX_LINES = 3000; 

function ParticleNetwork() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const pos = [];
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 6,
      });
      vel.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.003,
      });
    }
    return { pos, vel };
  }, []);

  // Pre-allocate reusable Three.js objects to prevent memory leaks in useFrame
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const purpleColor = useMemo(() => new THREE.Color("#8B5CF6"), []);
  const orangeColor = useMemo(() => new THREE.Color("#F97316"), []);
  
  // Pre-allocate arrays for line geometry
  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 6), []);
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 8), []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !linesRef.current) return;

    mouseRef.current.x = pointer.x * viewport.width * 0.5;
    mouseRef.current.y = pointer.y * viewport.height * 0.5;

    const time = clock.getElapsedTime();
    let lineIndex = 0;
    let colorIndex = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles.pos[i];
      const v = particles.vel[i];

      // Move
      p.x += v.x + Math.sin(time * 0.3 + i) * 0.002;
      p.y += v.y + Math.cos(time * 0.2 + i) * 0.002;
      p.z += v.z;

      // Mouse attraction
      const dx = mouseRef.current.x - p.x;
      const dy = mouseRef.current.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        p.x += dx * 0.001;
        p.y += dy * 0.001;
      }

      // Bounds
      if (Math.abs(p.x) > 7) v.x *= -1;
      if (Math.abs(p.y) > 5) v.y *= -1;
      if (Math.abs(p.z) > 4) v.z *= -1;

      // Update Instance matrix
      const scale = 0.03 + Math.sin(time + i) * 0.01;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Update Instance color
      tempColor.lerpColors(purpleColor, orangeColor, i / PARTICLE_COUNT);
      meshRef.current.setColorAt(i, tempColor);
    }

    // Connections
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const a = particles.pos[i];
        const b = particles.pos[j];
        const d = Math.sqrt(
          (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
        );

        if (d < CONNECTION_DISTANCE && lineIndex < MAX_LINES * 6) {
          // Add positions
          linePositions[lineIndex++] = a.x;
          linePositions[lineIndex++] = a.y;
          linePositions[lineIndex++] = a.z;
          linePositions[lineIndex++] = b.x;
          linePositions[lineIndex++] = b.y;
          linePositions[lineIndex++] = b.z;

          // Add colors with alpha based on distance
          const alpha = 1 - d / CONNECTION_DISTANCE;
          lineColors[colorIndex++] = 0.55; // R
          lineColors[colorIndex++] = 0.36; // G
          lineColors[colorIndex++] = 0.96; // B
          lineColors[colorIndex++] = alpha; // A
          
          lineColors[colorIndex++] = 0.98; // R
          lineColors[colorIndex++] = 0.45; // G
          lineColors[colorIndex++] = 0.09; // B
          lineColors[colorIndex++] = alpha; // A
        }
      }
    }

    // Update lines geometry optimally
    const geom = linesRef.current.geometry;
    geom.setDrawRange(0, lineIndex / 3);
    
    // Only update the attributes if they exist
    if (!geom.attributes.position) {
      geom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));
    } else {
      (geom.attributes.position as THREE.BufferAttribute).copyArray(linePositions);
      (geom.attributes.color as THREE.BufferAttribute).copyArray(lineColors);
      geom.attributes.position.needsUpdate = true;
      geom.attributes.color.needsUpdate = true;
    }

    // Tell R3F to update the instances
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[null as any, null as any, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0.8} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <ParticleNetwork />
      </Canvas>
    </div>
  );
};

export default HeroScene;