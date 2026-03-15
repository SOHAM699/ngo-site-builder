const Footer = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-ngo-purple-900/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ngo-purple-600 to-ngo-orange-500 flex items-center justify-center text-white font-display font-bold text-lg">
                CB
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Community<span className="text-ngo-orange-500">Bridge</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Empowering communities through connection, education, and sustainable development.
              Together, we build bridges to a better future.
            </p>
            <div className="flex gap-3">
              {["Twitter", "Instagram", "LinkedIn", "Facebook"].map((s) => (
                <button
                  key={s}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                  aria-label={s}
                >
                  {s[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Our Mission", href: "#mission" },
                { label: "Impact", href: "#achievements" },
                { label: "Gallery", href: "#gallery" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for impact stories and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border focus:border-ngo-purple-500 outline-none text-sm text-foreground"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ngo-purple-600 to-ngo-orange-500 text-white text-sm font-semibold hover:shadow-lg transition-all">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Designed & Devloped By Harsh Potdar 
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Privacy Policy</button>
            <button className="hover:text-foreground transition-colors">Terms of Service</button>
            <button className="hover:text-foreground transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
