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
    <section className="relative pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
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
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[0,1,2,3,4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-foreground/80"><strong className="ink-text">5.0</strong> Google Puanı</span>
              </div>
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

const SERVICES = [
  { icon: Rat, title: "Fare ve sıçan", short: "Apartman aralarına, depolara, restoran arka mutfaklarına özel köşe çözümleri.", details: ["Yem istasyonu ve takip", "Bina geneli koordinasyon", "Mevsimsel önleyici bakım"] },
  { icon: Bug, title: "Hamamböceği", short: "Jel yöntemi ile yumurtaya kadar etkili; mutfakta koku, leke bırakmaz.", details: ["Mutfak ve banyo odaklı", "Kokusuz jel uygulama", "10 gün içinde tamamen biter"] },
  { icon: SprayCan, title: "Karınca, pire, tahtakurusu", short: "Eve ya da işyerine göre seçilmiş, çocuk ve evcil hayvana uygun ürünler.", details: ["Çocuk & evcil dostu ürün", "Yatak odası için özel program", "Aynı gün uygulama"] },
  { icon: Home, title: "Apartman dezenfeksiyonu", short: "Site yönetimleri için periyodik bakım planları, raporlu ve sertifikalı.", details: ["3, 6 ve 12 aylık planlar", "Sakinlere bilgilendirme", "Resmi belge ve rapor"] },
  { icon: Building2, title: "İşyeri ve restoran", short: "Belediye denetimlerine uygun belge ve aylık takip; mesai dışı uygulama.", details: ["HACCP uyumlu süreç", "Mesai dışı çalışma", "Aylık denetim raporu"] },
  { icon: Siren, title: "Acil gece servisi", short: "Çok geç değil; gece ararsanız sabah ilk işimiz size geliyoruz.", details: ["Telefon hattı her zaman açık", "Esenyurt'a 30 dk", "Hafta sonu farkı yok"] },
];

function Services() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];
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
          <div className="text-sm text-muted-foreground">{String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}</div>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-6 lg:gap-10">
          <ul className="lg:col-span-5 flex flex-col">
            {SERVICES.map((it, i) => {
              const isActive = i === active;
              return (
                <li key={it.title}>
                  <button
                    onClick={() => setActive(i)}
                    className={`group w-full text-left flex items-center gap-4 py-5 border-t border-border last:border-b transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground"
                    }`}
                  >
                    <span className={`font-display text-sm w-8 ${isActive ? "accent-text" : "text-muted-foreground"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <it.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-accent" : "text-foreground/40"}`} />
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
                <s.icon className="h-7 w-7" />
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{String(active + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-7 font-display text-3xl md:text-5xl ink-text leading-[1.05]">{s.title}</h3>
            <p className="mt-4 text-foreground/75 leading-relaxed max-w-lg">{s.short}</p>
            <ul className="mt-7 space-y-3">
              {s.details.map((d) => (
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

const REVIEWS = [
  { name: "Ayşe K.", role: "Esenyurt, Pınar Mah.", text: "Aylardır mutfakta fare sorunumuz vardı, iki gün içinde tamamen bitti. Çok teşekkürler." },
  { name: "Mehmet D.", role: "Beylikdüzü", text: "Adamlar geldi, anlattılar, yaptılar, gittiler. Üç ay oldu, böcek namına bir şey görmedik." },
  { name: "Zeynep A.", role: "Avcılar", text: "Evde küçük çocuk var diye özel ürün seçtiler. Bu detay çok kıymetli." },
  { name: "Murat S.", role: "Restoran sahibi", text: "Aylık bakım anlaşmamız var. Belediye denetimlerinde içim rahat." },
  { name: "Elif T.", role: "Esenyurt", text: "Gece 11'de aradım, sabah 9'da kapıdaydılar. Sözünde duran insanlar." },
  { name: "Burak Y.", role: "Site yöneticisi", text: "Bina ortak alanlarımızı düzenli yapıyorlar. Sakinler memnun." },
];

function Reviews() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const total = REVIEWS.length;
  const go = (n: number) => { setDir(n > i ? 1 : -1); setI((n + total) % total); };
  const next = () => { setDir(1); setI((i + 1) % total); };
  const prev = () => { setDir(-1); setI((i - 1 + total) % total); };

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setI((p) => (p + 1) % total); }, 6500);
    return () => clearInterval(t);
  }, [total]);

  const r = REVIEWS[i];

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
                  {[0,1,2,3,4].map((j) => (
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
            {REVIEWS.map((_, j) => (
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

const FAQS = [
  { q: "Çocuklar ve evcil hayvanlar için tehlikeli mi?", a: "Hayır. Sağlık Bakanlığı onaylı, düşük toksisiteli ürünler kullanıyoruz. Çocuk ve evcil hayvan olan evlerde özel ürün seçiyoruz; kuruyana kadar 1-2 saat odadan uzak durmanız yeterli." },
  { q: "İşlem ne kadar sürer?", a: "Bir daire için ortalama 30-60 dakika. Geniş işyerleri ya da site ortak alanlarında 2-3 saati bulabilir." },
  { q: "Garanti veriyor musunuz?", a: "Evet, yazılı. Süresi içinde aynı sorun tekrarlarsa ücretsiz tekrar geliyoruz." },
  { q: "Gece ya da hafta sonu çalışıyor musunuz?", a: "Çalışıyoruz. Restoran ve işletmeler için zaten mesai dışı tercih ediliyor." },
  { q: "İşlem sonrası evden çıkmak gerekiyor mu?", a: "Çoğu uygulamada hayır. Sadece sisleme yöntemi yapıldıysa 2-3 saat dışarıda kalmanızı rica ediyoruz." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Sorular</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl ink-text leading-[1.05]">
              Çoğu insan <span className="serif-italic accent-text">bunları</span> soruyor.
            </h2>
            <p className="mt-5 text-foreground/70">
              Cevabını burada bulamadığınız her şey için telefon zaten açık.
            </p>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-border">
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
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Aldık. En kısa sürede size dönüyoruz.");
    }, 700);
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
