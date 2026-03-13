import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;
const CONNECTION_DISTANCE = 2.5;

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

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const purpleColor = useMemo(() => new THREE.Color("#8B5CF6"), []);
  const orangeColor = useMemo(() => new THREE.Color("#F97316"), []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !linesRef.current) return;

    mouseRef.current.x = pointer.x * viewport.width * 0.5;
    mouseRef.current.y = pointer.y * viewport.height * 0.5;

    const time = clock.getElapsedTime();
    const linePositions: number[] = [];
    const lineColors: number[] = [];

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

      const scale = 0.03 + Math.sin(time + i) * 0.01;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color().lerpColors(purpleColor, orangeColor, i / PARTICLE_COUNT);
      meshRef.current.setColorAt(i, color);
    }

    // Connections
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const a = particles.pos[i];
        const b = particles.pos[j];
        const d = Math.sqrt(
          (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2
        );
        if (d < CONNECTION_DISTANCE) {
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
          const alpha = 1 - d / CONNECTION_DISTANCE;
          lineColors.push(
            0.55, 0.36, 0.96, alpha,
            0.98, 0.45, 0.09, alpha
          );
        }
      }
    }

    const geom = linesRef.current.geometry;
    geom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    geom.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 4));
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
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
