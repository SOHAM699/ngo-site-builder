import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-image",
        { scale: 0.8, opacity: 0, rotateY: 15 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ngo-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ngo-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <p className="about-text text-sm font-semibold text-ngo-orange-500 uppercase tracking-widest mb-4">
            About Us
          </p>
          <h2 className="about-text text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
            Building Bridges,<br />
            <span className="gradient-text">Changing Lives</span>
          </h2>
          <p className="about-text text-lg text-muted-foreground mb-6 leading-relaxed">
            Founded in 2010, CommunityBridge began with a simple belief: every person
            deserves the opportunity to thrive. What started as a small group of passionate
            volunteers has grown into a global movement spanning 30+ countries.
          </p>
          <p className="about-text text-lg text-muted-foreground mb-8 leading-relaxed">
            We work at the intersection of education, healthcare, and sustainable development —
            creating programs that empower communities to build their own futures.
          </p>
          <div className="about-text flex gap-8">
            {[
              { number: "30+", label: "Countries" },
              { number: "14", label: "Years" },
              { number: "500+", label: "Partners" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-display font-bold gradient-text">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image placeholder */}
        <div className="about-image" style={{ perspective: "800px" }}>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
            <div className="absolute inset-0 bg-gradient-to-br from-ngo-purple-600/20 to-ngo-orange-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-ngo-purple-500 to-ngo-orange-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="font-display font-semibold text-foreground text-lg">Our Community</p>
                <p className="text-sm text-muted-foreground">Growing stronger together</p>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-ngo-purple-300/20 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
