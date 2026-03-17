import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, title: "Assurance", caption: "Your Case. Our Commitment.", aspect: "aspect-[4/5]" },
  { id: 2, title: "Workshops", caption: "Empowering Rural Voices: Mastering the legal tools you need to protect your family, your land, and your livelihood", aspect: "aspect-square" },
  { id: 3, title: "Courtroom Command", caption: "Developing the essential skills to analyze evidence, present compelling arguments, and achieve timely justice in the courtroom.", aspect: "aspect-[3/4]" },
  { id: 4, title: "The Personal Justice Clinic", caption: "A private, one-on-one session to demystify the legal system and provide you with a clear roadmap for protecting your individual rights.", aspect: "aspect-[4/3]" },
  { id: 5, title: "Rights Ambassadors", caption: "Bridging the gap between complex legal systems and everyday citizens through compassionate guidance and grassroots outreach", aspect: "aspect-[3/4]" },
  { id: 6, title: "Youth Program", caption: "Empowering the next generation of leaders to master their rights and advocate for justice.", aspect: "aspect-square" },
  { id: 7, title: "Know Your Power", caption: "Turning legal knowledge into a shield for the vulnerable and a tool for the future of our community", aspect: "aspect-[4/5]" },
  { id: 8, title: "The Litigation Core", caption: "A specialized team of legal experts dedicated to navigating court procedures and delivering high-impact advocacy for justice", aspect: "aspect-[3/4]" },
];

const images = [
  "/image1.jpeg",
  "/image2.png",
  "/image3.jpeg",
  "/image4.jpeg",
  "/image5.webp",
  "/image6.jpeg",
  "/image7.jpeg",
  "/image8.jpeg",
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
          <div 
            className={`relative ${item.aspect} rounded-2xl overflow-hidden bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]`}
            style={{ backgroundImage: `url(${images[i]})` }}
          >
                <div className="absolute inset-0 flex items-center justify-center">
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
                    <div 
                      className="aspect-video rounded-2xl bg-cover bg-center flex items-center justify-center"
                      style={{ backgroundImage: `url(${images[idx]})` }}
                    >
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
