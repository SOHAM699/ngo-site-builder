import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: "Community Workshop", caption: "Teaching digital skills in rural Kenya", aspect: "aspect-[4/5]" },
  { id: 2, title: "Water Project", caption: "New well installation in Bangladesh", aspect: "aspect-square" },
  { id: 3, title: "Youth Program", caption: "Leadership training for teenagers", aspect: "aspect-[3/4]" },
  { id: 4, title: "Healthcare Camp", caption: "Free medical checkups in remote areas", aspect: "aspect-[4/3]" },
  { id: 5, title: "Tree Planting", caption: "Environmental restoration project in Brazil", aspect: "aspect-[3/4]" },
  { id: 6, title: "School Opening", caption: "New school inauguration in Nepal", aspect: "aspect-square" },
  { id: 7, title: "Women's Workshop", caption: "Artisan skills for economic empowerment", aspect: "aspect-[4/5]" },
  { id: 8, title: "Volunteer Day", caption: "Community cleanup and bonding event", aspect: "aspect-[3/4]" },
];

const colors = [
  "from-ngo-purple-500 to-ngo-purple-700",
  "from-ngo-orange-400 to-ngo-orange-600",
  "from-ngo-purple-600 to-ngo-orange-500",
  "from-ngo-purple-400 to-ngo-purple-600",
  "from-ngo-orange-500 to-ngo-purple-500",
  "from-ngo-purple-500 to-ngo-orange-400",
  "from-ngo-orange-600 to-ngo-purple-600",
  "from-ngo-purple-700 to-ngo-orange-500",
];

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
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
      id="gallery"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-ngo-orange-500 uppercase tracking-widest mb-4">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Moments of <span className="gradient-text">Impact</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="gallery-grid columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className="gallery-item break-inside-avoid cursor-pointer group"
              onClick={() => setSelected(item.id)}
            >
              <div className={`relative ${item.aspect} rounded-2xl overflow-hidden bg-gradient-to-br ${colors[i]} transition-transform duration-300 group-hover:scale-[1.02]`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-display font-semibold text-sm">{item.title}</p>
                    <p className="text-white/70 text-xs">{item.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-2xl w-full glass rounded-3xl p-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const item = galleryItems.find((g) => g.id === selected);
                const idx = galleryItems.findIndex((g) => g.id === selected);
                if (!item) return null;
                return (
                  <>
                    <div className={`aspect-video rounded-2xl bg-gradient-to-br ${colors[idx]} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.caption}</p>
                    </div>
                  </>
                );
              })()}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-foreground hover:bg-accent"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
