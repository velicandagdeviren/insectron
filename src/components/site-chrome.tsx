import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Instagram, MapPin, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const PHONE = "+90 536 473 36 56";
const PHONE_TEL = "+905364733656";
const WHATSAPP = `https://wa.me/905364733656?text=${encodeURIComponent("Merhaba, ilaçlama için bilgi almak istiyorum.")}`;
const INSTAGRAM = "https://www.instagram.com/insectron_/";

const LINKS = [
  { href: "#services", label: "Hizmetler" },
  { href: "#why", label: "Biz Kimiz" },
  { href: "#process", label: "Süreç" },
  { href: "#reviews", label: "Yorumlar" },
  { href: "#faq", label: "S.S.S." },
  { href: "#contact", label: "İletişim" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // Active section tracking
      const sections = LINKS.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 120;
      let current = "";
      for (const s of sections) {
        if (s instanceof HTMLElement && s.offsetTop <= y) current = `#${s.id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`relative flex items-center justify-between gap-4 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-background/80 backdrop-blur-xl border border-border/80 shadow-[0_8px_30px_-12px_oklch(0.2_0.05_250/0.18)] px-3 pl-4 py-2"
              : "bg-transparent border border-transparent px-2 py-2"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/8 border border-primary/15 overflow-hidden transition-transform group-hover:scale-105">
              <img src={logo} alt="Insectron" width={32} height={32} className="h-6 w-6 object-contain" />
            </span>
            <span className="hidden sm:flex items-baseline gap-1.5">
              <span className="font-display text-xl ink-text leading-none">Insectron</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">İlaçlama</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative px-3 py-2 text-sm transition-colors rounded-full ${
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/8 border border-primary/15" />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </nav>


          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary pl-4 pr-1.5 py-1.5 text-sm font-medium text-primary-foreground transition-all hover:pr-2 group"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Hemen Ara</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur"
              aria-label="Menü"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[68px] z-40 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-lift p-4">
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-display hover:bg-secondary transition"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Ara
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 text-sm font-medium"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function FloatingActions() {
  return (
    <>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-accent/40 animate-pulse-ring" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform group-hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </span>
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        className="md:hidden fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        aria-label="Telefon"
      >
        <Phone className="h-6 w-6" />
      </a>
    </>
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-secondary/40">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Insectron" width={40} height={40} className="h-10 w-10 object-contain" />
            <div className="font-display text-3xl ink-text">Insectron <span className="serif-italic accent-text">İlaçlama</span></div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            Esenyurt merkezli, İstanbul genelinde ev, işyeri ve site bakımı yapan küçük bir ekibiz.
            İşimizi gürültüsüz, temiz ve sözümüze sadık şekilde yapıyoruz.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2.5 hover:text-primary transition" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2.5 hover:text-primary transition" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={`tel:${PHONE_TEL}`} className="rounded-full border border-border p-2.5 hover:text-primary transition" aria-label="Telefon">
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg ink-text mb-3">Sayfalar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-primary">Hizmetler</a></li>
            <li><a href="#why" className="hover:text-primary">Biz Kimiz</a></li>
            <li><a href="#process" className="hover:text-primary">Nasıl Çalışıyoruz</a></li>
            <li><a href="#faq" className="hover:text-primary">Sorular</a></li>
            <li><a href="#contact" className="hover:text-primary">İletişim</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg ink-text mb-3">Bize Ulaşın</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              Pınar Mah. 1218. Sk., Esenyurt
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> {PHONE}
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-primary" />
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-primary">@insectron_</a>
            </li>
            <li>Hafta içi & hafta sonu açık</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Insectron İlaçlama</p>
          <p>Esenyurt · İstanbul</p>
        </div>
      </div>
    </footer>
  );
}

export { PHONE, PHONE_TEL, WHATSAPP, INSTAGRAM };
