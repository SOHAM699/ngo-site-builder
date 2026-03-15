import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 3D scene: nodes that connect as you scroll
function MissionNodes({ progress }: { progress: { value: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodeCount = 40;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      positions.push(
        new THREE.Vector3(
          Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius + (Math.random() - 0.5) * 2
        )
      );
    }
    return positions;
  }, []);

  const centerPositions = useMemo(() => {
    return nodePositions.map((p) => {
      const dir = p.clone().normalize();
      return dir.multiplyScalar(1.5 + Math.random() * 0.5);
    });
  }, [nodePositions]);

  useFrame(({ clock }) => {
    if (!nodesRef.current || !linesRef.current || !groupRef.current) return;

    const t = progress.value;
    const time = clock.getElapsedTime();

    groupRef.current.rotation.y = time * 0.1;

    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const start = nodePositions[i];
      const end = centerPositions[i];
      const pos = new THREE.Vector3().lerpVectors(start, end, t);

      pos.y += Math.sin(time + i) * 0.1;

      const scale = 0.08 + t * 0.04;
      dummy.position.copy(pos);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color().lerpColors(
        new THREE.Color("#8B5CF6"),
        new THREE.Color("#F97316"),
        i / nodeCount
      );
      nodesRef.current.setColorAt(i, color);

      // Draw connections when close enough
      if (t > 0.2) {
        for (let j = i + 1; j < nodeCount; j++) {
          const otherStart = nodePositions[j];
          const otherEnd = centerPositions[j];
          const otherPos = new THREE.Vector3().lerpVectors(otherStart, otherEnd, t);
          otherPos.y += Math.sin(time + j) * 0.1;

          const dist = pos.distanceTo(otherPos);
          const maxDist = 3 - t * 1.5;

          if (dist < maxDist) {
            linePositions.push(pos.x, pos.y, pos.z, otherPos.x, otherPos.y, otherPos.z);
            const alpha = (1 - dist / maxDist) * t;
            lineColors.push(0.55, 0.36, 0.96, alpha, 0.98, 0.45, 0.09, alpha);
          }
        }
      }
    }

    const geom = linesRef.current.geometry;
    geom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    geom.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 4));

    nodesRef.current.instanceMatrix.needsUpdate = true;
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial transparent opacity={0.9} />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

const milestones = [
  {
    title: "Defend",
    description: "We provide expert legal representation for those facing unfair treatment in housing,labor, and family courts.",
  },
  {
    title: "Educate",
    description: "We host workshops and provide digital tools to help citizens understand their constitutional rights.",
  },
  {
    title: "Advocate",
    description: "We work with lawmakers to fix the <b>broken rungs</b> in the legal ladder that keep people in cycles of poverty.",
  },
  {
    title: "Sustain",
    description: "We work to restore the social and economic foundations of families who have been displaced or disenfranchised by legal gaps.",
  },
];

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven progress for the 3D scene
      gsap.to(progressRef.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Milestone text animations
      milestones.forEach((_, i) => {
        gsap.fromTo(
          `.milestone-${i}`,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.milestone-${i}`,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-[300vh]"
    >
      {/* Sticky 3D scene */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#8B5CF6" />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#F97316" />
            <MissionNodes progress={progressRef.current} />
          </Canvas>
        </div>

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80 z-[1]" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-ngo-orange-500 uppercase tracking-widest mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Your Roots,Your Rights,<span className="gradient-text">Our Mission.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              "Scroll to see how we Defend, Educate, Advocate, and Sustain—transforming legal vulnerability into lifelong security"
            </p>
          </div>
        </div>
      </div>

      {/* Milestone overlays */}
      <div className="relative z-20">
        {milestones.map((m, i) => (
          <div
            key={i}
            className={`milestone-${i} min-h-[60vh] flex items-center px-6`}
          >
            <div className={`max-w-md ${i % 2 === 0 ? "ml-8 md:ml-24" : "ml-auto mr-8 md:mr-24"}`}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ngo-purple-600 to-ngo-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">{m.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">
        Interactive 3D visualization showing how isolated community nodes gradually connect
        into a unified network as you scroll, representing CommunityBridge's mission.
      </span>
    </section>
  );
};

export default MissionSection;
