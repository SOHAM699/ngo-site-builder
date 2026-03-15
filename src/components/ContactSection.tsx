import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ngo-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16 contact-content">
          <p className="text-sm font-semibold text-ngo-orange-500 uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="contact-content">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-ngo-purple-500 to-ngo-orange-500 flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-xl text-sm font-semibold text-ngo-purple-600 hover:bg-accent transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-ngo-purple-500 focus:ring-2 focus:ring-ngo-purple-500/20 outline-none transition-all text-foreground"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-ngo-purple-500 focus:ring-2 focus:ring-ngo-purple-500/20 outline-none transition-all text-foreground"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-ngo-purple-500 focus:ring-2 focus:ring-ngo-purple-500/20 outline-none transition-all text-foreground resize-none"
                    placeholder="How can we work together?"
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-ngo-purple-600 to-ngo-orange-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-ngo-purple-600/30 transition-all hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="contact-content space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-display font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
<<<<<<< HEAD
                  { icon: "📍", label: "Address", value: "KIT's College of Engineering, Kolhapur, 416 234" },
                  { icon: "📧", label: "Email", value: "righttoroots.org@gmail.com" },
                  { icon: "📞", label: "Phone", value: "+8181808080" },
=======
                  { icon: "📍", label: "Address", value: "123 Community Lane, Impact City, IC 10001" },
                  { icon: "📧", label: "Email", value: "hello@communitybridge.org" },
                  { icon: "📞", label: "Phone", value: "+1 (555) 123-4567" },
>>>>>>> 22146cd5466ea075142a680c2568081f05e3f3d3
                  { icon: "🕐", label: "Hours", value: "Mon–Fri, 9:00 AM – 6:00 PM" },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "LinkedIn", "Facebook"].map((social) => (
                  <button
                    key={social}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
