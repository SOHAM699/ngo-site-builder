import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import HeroScene from "./HeroScene";

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current.querySelectorAll(".word"),
        { y: 80, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }

    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, []);

  const firstPart = "Advocacy. Action.";
  const gradientPart = "Accountability.";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-28 md:pt-32">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-ngo-orange-500 animate-glow-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Making a difference since 2026
          </span>
        </motion.div>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6"
          style={{ perspective: "600px" }}
        >
          <span className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
            <span className="text-foreground">{firstPart}</span>
          </span>
          <span className="word inline-block" style={{ opacity: 0 }}>
            <span className="gradient-text"> {gradientPart}</span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          We connect people, resources, and ideas to create sustainable change
          in communities worldwide. Together, we build bridges to a better future.
        </p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-ngo-purple-600 to-ngo-purple-700 text-white font-semibold text-lg hover:shadow-xl hover:shadow-ngo-purple-600/30 transition-all hover:scale-105"
          >
            Join Our Cause
          </button>
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-2xl glass font-semibold text-lg text-foreground hover:bg-accent transition-all hover:scale-105"
          >
            Learn More ↓
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-ngo-purple-500" />
        </motion.div>
      </motion.div>

      <span className="sr-only">
        Hero section with an interactive 3D particle network representing community connections.
      </span>
    </section>
  );
};

export default HeroSection;
