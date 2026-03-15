import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 50000, suffix: "+", label: "Lives Impacted", icon: "❤️" },
  { target: 120, suffix: "+", label: "Communities Served", icon: "🌍" },
  { target: 3500, suffix: "+", label: "Active Volunteers", icon: "🤝" },
  { target: 12, suffix: "M+", label: "Funds Raised ($)", icon: "💰" },
];

const achievements = [
  {
    title: "Clean Water Initiative",
    description: "Provided access to clean drinking water for 15,000 people across 8 villages in sub-Saharan Africa.",
    tag: "Healthcare",
  },
  {
    title: "Digital Literacy Program",
    description: "Trained 5,000+ youth in digital skills, connecting them with remote job opportunities worldwide.",
    tag: "Education",
  },
  {
    title: "Women's Empowerment",
    description: "Launched micro-finance programs supporting 2,000 women entrepreneurs in South Asia.",
    tag: "Economic",
  },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animations
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString() + stat.suffix;
          },
        });
      });

      // Cards
      gsap.fromTo(
        ".achievement-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".achievement-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ngo-purple-900/5 via-transparent to-ngo-orange-500/5" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-ngo-orange-500 uppercase tracking-widest mb-4">
            Our Impact
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Numbers That <span className="gradient-text">Tell Our Story</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <p className="text-3xl mb-3">{stat.icon}</p>
              <p className="text-3xl md:text-4xl font-display font-bold gradient-text">
                <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievement cards */}
        <div className="achievement-cards grid md:grid-cols-3 gap-8">
          {achievements.map((a) => (
            <div
              key={a.title}
              className="achievement-card glass rounded-2xl p-8 hover:shadow-xl hover:shadow-ngo-purple-600/10 transition-all group"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-ngo-purple-100 text-ngo-purple-700 mb-4">
                {a.tag}
              </span>
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-ngo-purple-600 transition-colors">
                {a.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
