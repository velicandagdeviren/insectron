import { supabase } from "./supabase";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string;
  status: "Yeni" | "Arandı" | "Planlandı" | "Tamamlandı";
  createdAt: string;
}

export interface Service {
  id: string;
  iconName: string;
  title: string;
  short: string;
  details: string[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface FAQ {
  id: string;
  q: string;
  a: string;
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    iconName: "Rat",
    title: "Fare ve sıçan",
    short: "Apartman aralarına, depolara, restoran arka mutfaklarına özel köşe çözümleri.",
    details: ["Yem istasyonu ve takip", "Bina geneli koordinasyon", "Mevsimsel önleyici bakım"],
  },
  {
    id: "2",
    iconName: "Bug",
    title: "Hamamböceği",
    short: "Jel yöntemi ile yumurtaya kadar etkili; mutfakta koku, leke bırakmaz.",
    details: ["Mutfak ve banyo odaklı", "Kokusuz jel uygulama", "10 gün içinde tamamen biter"],
  },
  {
    id: "3",
    iconName: "SprayCan",
    title: "Karınca, pire, tahtakurusu",
    short: "Eve ya da işyerine göre seçilmiş, çocuk ve evcil hayvana uygun ürünler.",
    details: ["Çocuk & evcil dostu ürün", "Yatak odası için özel program", "Aynı gün uygulama"],
  },
  {
    id: "4",
    iconName: "Home",
    title: "Apartman dezenfeksiyonu",
    short: "Site yönetimleri için periyodik bakım planları, raporlu ve sertifikalı.",
    details: ["3, 6 ve 12 aylık planlar", "Sakinlere bilgilendirme", "Resmi belge ve rapor"],
  },
  {
    id: "5",
    iconName: "Building2",
    title: "İşyeri ve restoran",
    short: "Belediye denetimlerine uygun belge ve aylık takip; mesai dışı uygulama.",
    details: ["HACCP uyumlu süreç", "Mesai dışı çalışma", "Aylık denetim raporu"],
  },
  {
    id: "6",
    iconName: "Siren",
    title: "Acil gece servisi",
    short: "Çok geç değil; gece ararsanız sabah ilk işimiz size geliyoruz.",
    details: ["Telefon hattı her zaman açık", "Esenyurt'a 30 dk", "Hafta sonu farkı yok"],
  },
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Ayşe K.",
    role: "Esenyurt, Pınar Mah.",
    text: "Aylardır mutfakta fare sorunumuz vardı, iki gün içinde tamamen bitti. Çok teşekkürler.",
    rating: 5,
  },
  {
    id: "2",
    name: "Mehmet D.",
    role: "Beylikdüzü",
    text: "Adamlar geldi, anlattılar, yaptılar, gittiler. Üç ay oldu, böcek namına bir şey görmedik.",
    rating: 5,
  },
  {
    id: "3",
    name: "Zeynep A.",
    role: "Avcılar",
    text: "Evde küçük çocuk var diye özel ürün seçtiler. Bu detay çok kıymetli.",
    rating: 5,
  },
  {
    id: "4",
    name: "Murat S.",
    role: "Restoran sahibi",
    text: "Aylık bakım anlaşmamız var. Belediye denetimlerinde içim rahat.",
    rating: 5,
  },
  {
    id: "5",
    name: "Elif T.",
    role: "Esenyurt",
    text: "Gece 11'de aradım, sabah 9'da kapıdaydılar. Sözünde duran insanlar.",
    rating: 5,
  },
  {
    id: "6",
    name: "Burak Y.",
    role: "Site yöneticisi",
    text: "Bina ortak alanlarımızı düzenli yapıyorlar. Sakinler memnun.",
    rating: 5,
  },
];

const DEFAULT_FAQS: FAQ[] = [
  {
    id: "1",
    q: "Çocuklar ve evcil hayvanlar için tehlikeli mi?",
    a: "Hayır. Sağlık Bakanlığı onaylı, düşük toksisiteli ürünler kullanıyoruz. Çocuk ve evcil hayvan olan evlerde özel ürün seçiyoruz; kuruyana kadar 1-2 saat odadan uzak durmanız yeterli.",
  },
  {
    id: "2",
    q: "İşlem ne kadar sürer?",
    a: "Bir daire için ortalama 30-60 dakika. Geniş işyerleri ya da site ortak alanlarında 2-3 saati bulabilir.",
  },
  {
    id: "3",
    q: "Garanti veriyor musunuz?",
    a: "Evet, yazılı. Süresi içinde aynı sorun tekrarlarsa ücretsiz tekrar geliyoruz.",
  },
  {
    id: "4",
    q: "Gece ya da hafta sonu çalışıyor musunuz?",
    a: "Çalışıyoruz. Restoran ve işletmeler için zaten mesai dışı tercih ediliyor.",
  },
  {
    id: "5",
    q: "İşlem sonrası evden çıkmak gerekiyor mu?",
    a: "Çoğu uygulamada hayır. Sadece sisleme yöntemi yapıldıysa 2-3 saat dışarıda kalmanızı rica ediyoruz.",
  },
];

const DEFAULT_LEADS: Lead[] = [
  {
    id: "lead_1",
    name: "Ahmet Yılmaz",
    phone: "0532 111 2233",
    service: "Hamamböceği",
    message: "Mutfakta tezgah arkasında çok fazla küçük böcek görmeye başladık. Jel ilaçlama istiyoruz.",
    status: "Yeni",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "lead_2",
    name: "Fatma Demir",
    phone: "0544 222 3344",
    service: "Fare ya da sıçan",
    message: "Bodrum kattaki depomuzdan tıkırtılar geliyor, sanırım sıçan var. İstasyon kurulması lazım.",
    status: "Arandı",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
  },
  {
    id: "lead_3",
    name: "Mustafa Kaya",
    phone: "0555 333 4455",
    service: "Apartman dezenfeksiyonu",
    message: "12 dairelik binamızın merdiven boşluğu ve sığınak alanının ilaçlanması için fiyat teklifi rica ederiz.",
    status: "Planlandı",
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(), // 30 hours ago
  },
  {
    id: "lead_4",
    name: "Derya Çelik",
    phone: "0533 444 5566",
    service: "Karınca / pire / tahtakurusu",
    message: "Kedimizden pire bulaştı sanırım, tüm evi pireler sardı. Acil ilaçlama istiyoruz.",
    status: "Tamamlandı",
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString(), // 50 hours ago
  },
  {
    id: "lead_5",
    name: "Caner Şahin",
    phone: "0507 555 6677",
    service: "İşyeri / restoran",
    message: "Döner salonumuz için aylık periyodik ilaçlama sözleşmesi yapmak istiyoruz, belediye belgeli olmalı.",
    status: "Tamamlandı",
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(), // 4 days ago
  },
];

// Helper to check and initialize data
function initDB() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("insectron_services")) {
    localStorage.setItem("insectron_services", JSON.stringify(DEFAULT_SERVICES));
  }
  if (!localStorage.getItem("insectron_reviews")) {
    localStorage.setItem("insectron_reviews", JSON.stringify(DEFAULT_REVIEWS));
  }
  if (!localStorage.getItem("insectron_faqs")) {
    localStorage.setItem("insectron_faqs", JSON.stringify(DEFAULT_FAQS));
  }
  if (!localStorage.getItem("insectron_leads")) {
    localStorage.setItem("insectron_leads", JSON.stringify(DEFAULT_LEADS));
  }
}

// Call initialization immediately
initDB();

export const db = {
  // ── Leads (Supabase) ──────────────────────────────────────────
  async getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) { console.error(error); return []; }
    return (data ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      service: r.service,
      message: r.message,
      status: r.status,
      createdAt: r.created_at,
    }));
  },

  async addLead(lead: Omit<Lead, "id" | "status" | "createdAt">): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("leads")
        .insert([{ ...lead, status: "Yeni" }])
        .select()
        .single();
      if (error) {
        console.error("Supabase insert error:", error);
        return { success: false, error: error.message };
      }
      if (!data) {
        return { success: false, error: "Veri kaydedilemedi ama hata dönmedi." };
      }
      return {
        success: true,
        data: {
          id: data.id,
          name: data.name,
          phone: data.phone,
          service: data.service,
          message: data.message,
          status: data.status,
          createdAt: data.created_at,
        },
      };
    } catch (e: any) {
      console.error("addLead exception:", e);
      return { success: false, error: e.message || String(e) };
    }
  },

  async updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    if (error) { console.error(error); return false; }
    return true;
  },

  async deleteLead(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);
    if (error) { console.error(error); return false; }
    return true;
  },

  // Services
  getServices(): Service[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("insectron_services") || "[]");
  },

  saveServices(services: Service[]) {
    localStorage.setItem("insectron_services", JSON.stringify(services));
  },

  updateService(service: Service): boolean {
    const services = this.getServices();
    const idx = services.findIndex((s) => s.id === service.id);
    if (idx === -1) return false;
    services[idx] = service;
    this.saveServices(services);
    return true;
  },

  // Reviews
  getReviews(): Review[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("insectron_reviews") || "[]");
  },

  saveReviews(reviews: Review[]) {
    localStorage.setItem("insectron_reviews", JSON.stringify(reviews));
  },

  addReview(review: Omit<Review, "id">): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...review,
      id: "review_" + Math.random().toString(36).substr(2, 9),
    };
    reviews.unshift(newReview);
    this.saveReviews(reviews);
    return newReview;
  },

  updateReview(review: Review): boolean {
    const reviews = this.getReviews();
    const idx = reviews.findIndex((r) => r.id === review.id);
    if (idx === -1) return false;
    reviews[idx] = review;
    this.saveReviews(reviews);
    return true;
  },

  deleteReview(id: string): boolean {
    const reviews = this.getReviews();
    const filtered = reviews.filter((r) => r.id !== id);
    if (reviews.length === filtered.length) return false;
    this.saveReviews(filtered);
    return true;
  },

  // FAQs
  getFAQs(): FAQ[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("insectron_faqs") || "[]");
  },

  saveFAQs(faqs: FAQ[]) {
    localStorage.setItem("insectron_faqs", JSON.stringify(faqs));
  },

  addFAQ(faq: Omit<FAQ, "id">): FAQ {
    const faqs = this.getFAQs();
    const newFAQ: FAQ = {
      ...faq,
      id: "faq_" + Math.random().toString(36).substr(2, 9),
    };
    faqs.push(newFAQ);
    this.saveFAQs(faqs);
    return newFAQ;
  },

  updateFAQ(faq: FAQ): boolean {
    const faqs = this.getFAQs();
    const idx = faqs.findIndex((f) => f.id === faq.id);
    if (idx === -1) return false;
    faqs[idx] = faq;
    this.saveFAQs(faqs);
    return true;
  },

  deleteFAQ(id: string): boolean {
    const faqs = this.getFAQs();
    const filtered = faqs.filter((f) => f.id !== id);
    if (faqs.length === filtered.length) return false;
    this.saveFAQs(filtered);
    return true;
  },

  // Auth helper
  login(username: string, password: string): boolean {
    if (username === "admin" && password === "insectron123") {
      sessionStorage.setItem("insectron_authenticated", "true");
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem("insectron_authenticated");
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("insectron_authenticated") === "true";
  },
};
