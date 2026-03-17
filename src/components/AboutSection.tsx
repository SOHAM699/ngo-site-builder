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
            Defending Rights ,<br />
            <span className="gradient-text">Restoring Dignity</span>
          </h2>
          <p className="about-text text-lg text-muted-foreground mb-6 leading-relaxed">
            Established in <strong className="font-bold text-foreground">2025</strong>, Right to Roots works to ensure justice and equal rights for every individual in society.
          </p>
          <p className="about-text text-lg text-muted-foreground mb-6 leading-relaxed">
            In a perfect world, the law is a shield that protects everyone equally. In reality, that shield is often hidden behind a paywall. At <strong className="font-bold text-foreground">Right to Roots</strong>, we believe that your bank balance should never determine your legal outcome.
          </p>
          <p className="about-text text-lg text-muted-foreground mb-8 leading-relaxed">
           We are a dedicated team of advocates, attorneys, and community organizers committed to closing the "<strong className="font-bold text-foreground">Justice Gap</strong>." By providing high-quality, free legal representation to marginalized communities, we ensure that the most vulnerable among us have a voice in the courtroom and a seat at the table.
          </p>
          <div className="about-text flex gap-8">
            {[
              { number: "20+", label: "States" },
              { number: "120+", label: "Communities" },
              { number: "70+", label: "Branches" },
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-35 h-35 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <img src="/NGO_logo.png" alt="" /> 
                </div>
                <p className="font-display font-semibold text-foreground text-lg">Our Community</p>
                <p className="text-sm text-muted-foreground">Growing stronger together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;