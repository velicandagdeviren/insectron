import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Rat,
  Bug,
  SprayCan,
  Building2,
  Home,
  Siren,
  ArrowUpRight,
  Star,
  MapPin,
  Send,
  MessageCircle,
  Instagram,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-technician.jpg";
import {
  Nav,
  Footer,
  FloatingActions,
  ScrollProgress,
  PHONE,
  PHONE_TEL,
  WHATSAPP,
} from "@/components/site-chrome";
import { toast } from "sonner";
import { db } from "@/lib/db";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Splash />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <WhyUs />
        <Process />
        <Reviews />
        <WhatsappCta />
        <Emergency />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

/* ───────── SPLASH ───────── */

function Splash() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl ink-text"
            >
              Insectron <span className="serif-italic accent-text">İlaçlama</span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="mt-4 mx-auto h-px w-32 bg-foreground/30 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────── HERO ───────── */

function Hero() {
  return (
    <section className="relative pt-28 md:pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Esenyurt · İstanbul · 2012'den beri
            </div>
            <h1 className="mt-6 font-display text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] ink-text">
              Eviniz huzurlu olsun{" "}
              <span className="serif-italic accent-text">— gerisini</span> biz hallederiz.
            </h1>
            <p className="mt-7 text-lg text-foreground/75 max-w-xl leading-relaxed">
              Fare, hamamböceği ya da görünmez misafirler... Esenyurt'tan çıkıp aynı gün
              kapınıza geliyor, işi bir kerede ve temiz şekilde bitiriyoruz.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="group inline-flex items-center gap-3 rounded-full bg-primary pl-5 pr-3 py-3 text-base font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" />
                <span>{PHONE}</span>
                <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-base font-medium underline-mark hover:text-primary transition"
              >
                Ücretsiz keşif iste
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <a
                href="https://www.google.com/maps/place/%C4%B0nsectron+%C4%B0la%C3%A7lama/@41.0356506,28.6649662,17z/data=!3m1!4b1!4m6!3m5!1s0x14b55f30123fda57:0x810fca881b56115!8m2!3d41.0356506!4d28.6675411!16s%2Fg%2F11xlkcllwl?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-pointer"
              >
                <div className="flex">
                  {[0,1,2,3,4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-foreground/80"><strong className="ink-text">5.0</strong> Google Puanı</span>
              </a>

              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-2 text-foreground/80">
                <Clock className="h-4 w-4 text-primary" /> Hafta sonu da açığız
              </div>
              <span className="text-muted-foreground">·</span>
              <div className="text-foreground/80">Yazılı garanti</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-secondary grain">
                <img
                  src={heroImg}
                  alt="Insectron teknisyeni"
                  width={1600}
                  height={2000}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 paper-card-lift rounded-2xl p-4 max-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Acil Hat</div>
                    <a href={`tel:${PHONE_TEL}`} className="font-medium text-sm ink-text">{PHONE}</a>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -top-4 -right-2 sm:-right-6 paper-card rounded-xl px-3 py-2 text-xs font-medium rotate-3">
                <span className="serif-italic accent-text">12 yıl</span> saha tecrübesi
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── MARQUEE ───────── */

function Marquee() {
  const items = [
    "Fare & Sıçan", "Hamamböceği", "Karınca", "Tahtakurusu", "Pire", "Sinek",
    "Akrep", "Apartman Dezenfeksiyonu", "Restoran Bakımı", "Site Yönetimi",
  ];
  const row = [...items, ...items];
  return (
    <section className="border-y border-border bg-secondary/50 py-5 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="px-8 font-display text-2xl text-foreground/60">
            {t} <span className="accent-text mx-2">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ───────── SERVICES ───────── */

const iconMap: Record<string, React.ComponentType<any>> = {
  Rat,
  Bug,
  SprayCan,
  Building2,
  Home,
  Siren,
};

function Services() {
  const [services] = useState(() => db.getServices());
  const [active, setActive] = useState(0);
  const s = services[active];
  
  if (!s) return null;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Hizmetler</div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl ink-text leading-[1.05]">
              Her ev, her iş yeri <span className="serif-italic accent-text">farklı.</span>
              <br />Çözüm de öyle olmalı.
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</div>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-6 lg:gap-10">
          <ul className="lg:col-span-5 flex flex-col">
            {services.map((it, i) => {
              const isActive = i === active;
              const IconComponent = iconMap[it.iconName] || Bug;
              return (
                <li key={it.id || it.title}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group w-full text-left flex items-center gap-4 py-5 border-t border-border last:border-b transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground"
                    }`}
                  >
                    <span className={`font-display text-sm w-8 ${isActive ? "accent-text" : "text-muted-foreground"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <IconComponent className={`h-5 w-5 shrink-0 ${isActive ? "text-accent" : "text-foreground/40"}`} />
                    <span className="font-display text-2xl md:text-3xl flex-1">{it.title}</span>
                    <ArrowUpRight
                      className={`h-5 w-5 transition-all duration-300 ${
                        isActive ? "opacity-100 translate-x-0 text-accent" : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 paper-card rounded-3xl p-8 md:p-10 relative overflow-hidden grain"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 text-primary border border-primary/15">
                {(() => {
                  const IconComponent = iconMap[s.iconName] || Bug;
                  return <IconComponent className="h-7 w-7" />;
                })()}
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{String(active + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-7 font-display text-3xl md:text-5xl ink-text leading-[1.05]">{s.title}</h3>
            <p className="mt-4 text-foreground/75 leading-relaxed max-w-lg">{s.short}</p>
            <ul className="mt-7 space-y-3">
              {s.details.map((d: string) => (
                <li key={d} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-foreground/80">{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform"
              >
                <Phone className="h-4 w-4" /> Hemen ara
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:text-primary transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp'tan yaz
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── WHY US ───────── */

function WhyUs() {
  const stats = [
    { n: "12", l: "yıl saha tecrübesi" },
    { n: "500+", l: "tamamlanan iş" },
    { n: "5.0", l: "Google puanı" },
    { n: "30dk", l: "ortalama varış" },
  ];

  const values = [
    { n: "01", k: "Esenyurt'tan, Esenyurt için", v: "Mahalleyi, binaları, yöneticileri tanıyoruz. Aynı gün, çoğu zaman aynı saat içinde kapınızdayız." },
    { n: "02", k: "Sözümüz sözleşmedir", v: "Saatinde geliriz, geç kalırsak haber veririz. İş bittikten sonra da telefon açık kalır." },
    { n: "03", k: "Çocuk ve evcil dostu ürünler", v: "Sağlık Bakanlığı onaylı, düşük toksisiteli kimyasallar. Hangi ürünü neden seçtiğimizi açıklarız." },
    { n: "04", k: "Yazılı garanti", v: "İşlem sonrası garanti belgesi veriyoruz. Süresi içinde tekrarlarsa ücretsiz tekrar geliriz." },
  ];

  return (
    <section id="why" className="relative py-24 md:py-32 bg-secondary/40 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-accent" /> Biz Kimiz
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl ink-text leading-[1.02]">
            On iki yıldır <span className="serif-italic accent-text">aynı mahallede,</span>
            <br className="hidden md:block" /> aynı insanlarla.
          </h2>
          <p className="mt-7 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            Insectron, Esenyurt'ta küçük bir ailedir. Reklam değil, komşu tavsiyesiyle büyüdük.
            Her eve, her işyerine kendi evimiz gibi giriyoruz; işimizi temiz, sessiz ve
            sözümüze sadık şekilde bitiriyoruz.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-3xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.l} className="bg-background p-6 md:p-8">
              <div className="font-display text-4xl md:text-6xl ink-text leading-none">{s.n}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="paper-card-lift rounded-3xl p-8 grain relative overflow-hidden">
              <Quote className="absolute -top-2 -right-2 h-24 w-24 text-accent/15" />
              <div className="relative">
                <p className="font-display text-2xl md:text-3xl ink-text leading-[1.2]">
                  "İşi alıp kaçmıyoruz. Bir hafta sonra arar, sorunu çözüldü mü diye sorarız.
                  <span className="serif-italic accent-text"> Çünkü buradan gitmiyoruz.</span>"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium border border-primary/15">
                    İ
                  </div>
                  <div>
                    <div className="font-medium ink-text text-sm">İbrahim — Kurucu</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Insectron İlaçlama</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="paper-card rounded-2xl p-6 hover:shadow-lift transition-shadow"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-sm accent-text">{v.n}</span>
                    <span className="h-px flex-1 ml-3 bg-border" />
                  </div>
                  <h4 className="mt-4 font-display text-xl md:text-2xl ink-text leading-tight">{v.k}</h4>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{v.v}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PROCESS ───────── */

const STEPS = [
  { t: "Telefon", d: "Anlatırsınız, soruyu sorarız, kabaca süre ve ücret söyleriz." },
  { t: "Keşif", d: "Eve geliyoruz; sorunun kaynağını görmeden işleme başlamıyoruz." },
  { t: "Uygulama", d: "Size uygun saatte, az dökümlü yöntemle iş bitiriliyor." },
  { t: "Takip", d: "Birkaç gün sonra arar, durumu sorarız. Gerekirse tekrar geliriz." },
];

function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Nasıl Çalışıyoruz"
          title={<>Sade bir <span className="serif-italic accent-text">akış.</span></>}
        />
        <div className="mt-16 grid md:grid-cols-4 gap-y-10 md:gap-10 relative">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl accent-text">{String(i + 1).padStart(2,"0")}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h4 className="mt-4 font-display text-2xl ink-text">{s.t}</h4>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── REVIEWS (carousel) ───────── */

function Reviews() {
  const [reviews] = useState(() => db.getReviews());
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const total = reviews.length;
  const go = (n: number) => { setDir(n > i ? 1 : -1); setI((n + total) % (total || 1)); };
  const next = () => { setDir(1); setI((i + 1) % (total || 1)); };
  const prev = () => { setDir(-1); setI((i - 1 + total) % (total || 1)); };

  useEffect(() => {
    if (total === 0) return;
    const t = setInterval(() => { setDir(1); setI((p) => (p + 1) % total); }, 6500);
    return () => clearInterval(t);
  }, [total]);

  if (total === 0) return null;
  const r = reviews[i];

  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Müşterilerimiz</div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl ink-text leading-[1.05]">
              Komşulardan gelen <span className="serif-italic accent-text">sözler.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Önceki yorum"
              className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-background hover:border-primary hover:text-primary transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Sonraki yorum"
              className="h-12 w-12 rounded-full border border-border flex items-center justify-center hover:bg-background hover:border-primary hover:text-primary transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-14 relative">
          <div className="paper-card-lift rounded-3xl p-8 md:p-14 min-h-[360px] md:min-h-[340px] relative overflow-hidden">
            <Quote className="absolute top-8 right-8 h-16 w-16 text-accent/20" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={i}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 40 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative max-w-3xl"
              >
                <div className="flex">
                  {Array.from({ length: r.rating || 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-2xl md:text-4xl ink-text leading-[1.15]">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium border border-primary/15">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium ink-text">{r.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.role} · Google</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, j) => (
              <button
                key={j}
                onClick={() => go(j)}
                aria-label={`Yorum ${j + 1}`}
                className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── WHATSAPP CTA ───────── */

function WhatsappCta() {
  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border paper-card"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <span className="absolute inset-0 rounded-2xl bg-[#25D366]/30 animate-pulse-ring" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                  <MessageCircle className="h-7 w-7" />
                </span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">WhatsApp</div>
                <h3 className="mt-2 font-display text-2xl md:text-3xl ink-text leading-tight max-w-xl">
                  Telefon kalabalıksa <span className="serif-italic accent-text">yazın</span> — birkaç dakika içinde döneriz.
                </h3>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:items-end">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-3.5 text-sm font-medium transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp'tan başla
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium hover:text-primary transition"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── EMERGENCY ───────── */

function Emergency() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground p-10 md:p-16 grain"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">Aciliyse</div>
              <h3 className="mt-3 font-display text-4xl md:text-6xl leading-[1.05]">
                Hemen <span className="serif-italic" style={{ color: "var(--accent)" }}>arayın.</span>
                <br />Sabah ilk siz olun.
              </h3>
              <p className="mt-5 text-primary-foreground/80 max-w-md">
                Beklemeyin. Önce dinleriz, sonra geliriz.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href={`tel:${PHONE_TEL}`}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-background text-foreground px-7 py-5 text-xl font-medium transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-5 w-5 text-accent" />
                {PHONE}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm hover:bg-primary-foreground/10 transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp ile yazın
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */

function Faq() {
  const [faqs] = useState(() => db.getFAQs());
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Sorunlar</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl ink-text leading-[1.05]">
              Çoğu insan <span className="serif-italic accent-text">bunları</span> soruyor.
            </h2>
            <p className="mt-5 text-foreground/70">
              Cevabını burada bulamadığınız her şey için telefon zaten açık.
            </p>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.id || f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-xl md:text-2xl ink-text">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-foreground/75 leading-relaxed max-w-2xl">{f.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── CONTACT ───────── */

function Contact() {
  const [sending, setSending] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;

    const result = await db.addLead({ name, phone, service, message });
    setSending(false);
    if (result) {
      (e.target as HTMLFormElement).reset();
      toast.success("Talebiniz alındı. En kısa sürede size döneceğiz.");
    } else {
      toast.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  }
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="İletişim"
          title={<>Bir <span className="serif-italic accent-text">telefon</span> kadar uzaktayız.</>}
        />
        <div className="mt-16 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="paper-card rounded-2xl p-7">
              <h4 className="font-display text-2xl ink-text">Adres & saatler</h4>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium ink-text">Pınar Mah. 1218. Sk.</div>
                    <div className="text-muted-foreground">Esenyurt / İstanbul</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <a href={`tel:${PHONE_TEL}`} className="font-medium ink-text">{PHONE}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium ink-text">Her gün açığız</div>
                    <div className="text-muted-foreground">Aciliyse gece de arayın</div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium hover:text-primary">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </div>
              <div className="mt-6 text-xs text-muted-foreground">
                Hizmet verdiğimiz semtler: Esenyurt, Beylikdüzü, Avcılar, Küçükçekmece, Başakşehir, Büyükçekmece.
              </div>
            </div>

            <div className="paper-card rounded-2xl overflow-hidden h-56">
              <iframe
                title="Insectron Konum"
                src="https://www.google.com/maps?q=Esenyurt+Pınar+Mahallesi&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 paper-card rounded-2xl p-7 md:p-9 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Adınız" name="name" required />
              <Field label="Telefon" name="phone" type="tel" required />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Sorun ne?</label>
              <select name="service" className="mt-1.5 w-full rounded-lg bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>Fare ya da sıçan</option>
                <option>Hamamböceği</option>
                <option>Karınca / pire / tahtakurusu</option>
                <option>Apartman dezenfeksiyonu</option>
                <option>İşyeri / restoran</option>
                <option>Acil — bugün gelin</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Birkaç cümle ile anlatın</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Nerede, ne zamandır, ne sıklıkta görüyorsunuz..."
                className="mt-1.5 w-full rounded-lg bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-4 text-base font-medium transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {sending ? "Gönderiliyor..." : "Gönder"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Bilgileriniz sadece size dönmek için kullanılır.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1.5 w-full rounded-lg bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

/* ───────── SHARED ───────── */

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-4 font-display text-4xl md:text-6xl ink-text leading-[1.05]">{title}</h2>
    </motion.div>
  );
}
