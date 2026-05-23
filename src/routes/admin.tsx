import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Wrench,
  HelpCircle,
  LogOut,
  Trash2,
  Edit2,
  Plus,
  Search,
  Check,
  X,
  Phone,
  User,
  Star,
  PlusCircle,
  FileText,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle,
  Eye,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { db, Lead, Service, Review, FAQ } from "@/lib/db";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "reviews" | "services" | "faqs">("dashboard");

  // Load Auth state
  useEffect(() => {
    setIsAuthenticated(db.isAuthenticated());
  }, []);

  const handleLogout = () => {
    db.logout();
    setIsAuthenticated(false);
    toast.success("Çıkış yapıldı.");
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-border pb-5">
          <div>
            <h1 className="font-display text-4xl ink-text">Yönetim Paneli</h1>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              Insectron İlaçlama Yönetim ve Takip
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Sistem Çevrimiçi</span>
          </div>
        </header>

        {/* Tab Components */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeTab === "dashboard" && <DashboardTab />}
            {activeTab === "leads" && <LeadsTab />}
            {activeTab === "reviews" && <ReviewsTab />}
            {activeTab === "services" && <ServicesTab />}
            {activeTab === "faqs" && <FaqsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ───────── LOGIN SCREEN ───────── */

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (db.login(username, password)) {
        onLoginSuccess();
        toast.success("Başarıyla giriş yapıldı.");
      } else {
        setError("Kullanıcı adı veya şifre hatalı.");
        toast.error("Giriş başarısız.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden grain">
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md paper-card-lift rounded-[2rem] p-8 md:p-10 bg-card relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl ink-text">Insectron</h2>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">
            Yönetici Girişi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Kullanıcı Adı</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-lg bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Kullanıcı adınızı girin"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Şifre</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium transition hover:scale-[1.01] disabled:opacity-60 mt-2"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ───────── SIDEBAR NAVIGATION ───────── */

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onLogout: () => void;
}

function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const tabs = [
    { id: "dashboard", label: "Genel Bakış", icon: LayoutDashboard },
    { id: "leads", label: "Talepler", icon: Inbox },
    { id: "reviews", label: "Müşteri Yorumları", icon: MessageSquare },
    { id: "services", label: "Hizmetlerimiz", icon: Wrench },
    { id: "faqs", label: "Sıkça Sorulanlar", icon: HelpCircle },
  ];

  return (
    <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border flex flex-col md:min-h-screen grain shrink-0">
      {/* Brand */}
      <div className="p-6 border-b border-border/80 flex items-center justify-between">
        <a href="/" className="font-display text-2xl ink-text flex items-center gap-2">
          Insectron <span className="serif-italic accent-text text-sm">Panel</span>
        </a>
        <button
          onClick={onLogout}
          className="md:hidden p-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
          title="Çıkış Yap"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      {/* Nav Link List */}
      <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 shrink-0 md:shrink ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 bg-secondary/30 md:bg-transparent"
              } md:w-full`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-border mt-auto hidden md:block">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}

/* ───────── TAB: DASHBOARD / OVERVIEW ───────── */

function DashboardTab() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setLeads(db.getLeads());
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "Yeni").length;
  const inProgressLeads = leads.filter((l) => l.status === "Arandı" || l.status === "Planlandı").length;
  const completedLeads = leads.filter((l) => l.status === "Tamamlandı").length;

  // Chart data calculation
  const serviceCounts = leads.reduce((acc, lead) => {
    acc[lead.service] = (acc[lead.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(serviceCounts).map(([name, count]) => ({
    name: name.length > 15 ? name.substring(0, 15) + "..." : name,
    Talep: count,
  }));

  const COLORS = ["#0c1b33", "#ca8a04", "#854d0e", "#1e3a8a", "#0d9488", "#b91c1c"];

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Toplam Talep" value={totalLeads} icon={FileText} color="primary" />
        <StatCard
          title="Bekleyen (Yeni)"
          value={newLeads}
          icon={AlertCircle}
          color="accent"
          pulse={newLeads > 0}
        />
        <StatCard title="İşlemde" value={inProgressLeads} icon={Calendar} color="secondary" />
        <StatCard title="Tamamlanan" value={completedLeads} icon={CheckCircle} color="success" />
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Recharts Chart */}
        <div className="lg:col-span-7 paper-card rounded-2xl p-6 bg-card">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-display text-2xl ink-text">Hizmet Türü Dağılımı</h3>
          </div>
          <div className="h-72 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="Talep" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Henüz talep verisi bulunmamaktadır.
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-5 paper-card rounded-2xl p-6 bg-card flex flex-col">
          <h3 className="font-display text-2xl ink-text mb-5 flex items-center gap-2">
            Son Talepler
            {newLeads > 0 && (
              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-sans font-medium">
                {newLeads} Yeni
              </span>
            )}
          </h3>
          <div className="space-y-3.5 overflow-y-auto max-h-[280px] flex-1">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium text-sm text-foreground flex items-center gap-2">
                    <span className="truncate">{lead.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        lead.status === "Yeni"
                          ? "bg-accent/15 text-accent border border-accent/20"
                          : lead.status === "Tamamlandı"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "bg-primary/10 text-primary border border-primary/20"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">
                    {lead.service} · {lead.message || "Mesaj bırakılmadı"}
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground text-right shrink-0">
                  {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Henüz talep kaydı bulunmamaktadır.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  color: "primary" | "accent" | "secondary" | "success";
  pulse?: boolean;
}

function StatCard({ title, value, icon: Icon, color, pulse }: StatCardProps) {
  const colorMap = {
    primary: "bg-primary/5 text-primary border-primary/20",
    accent: "bg-accent/5 text-accent border-accent/20",
    secondary: "bg-secondary/40 text-foreground/80 border-border",
    success: "bg-emerald-500/5 text-emerald-600 border-emerald-500/15",
  };

  return (
    <div className={`p-5 rounded-2xl border paper-card relative overflow-hidden bg-card`}>
      {pulse && <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-accent animate-ping" />}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <h4 className="font-display text-4xl ink-text mt-3 font-semibold">{value}</h4>
        </div>
        <div className={`p-2.5 rounded-xl border ${colorMap[color]} shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

/* ───────── TAB: LEADS / INQUIRIES ───────── */

function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tümü");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    setLeads(db.getLeads());
  }, []);

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    db.updateLeadStatus(id, status);
    setLeads(db.getLeads());
    toast.success("Talep durumu güncellendi.");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu talebi silmek istediğinizden emin misiniz?")) {
      db.deleteLead(id);
      setLeads(db.getLeads());
      toast.success("Talep başarıyla silindi.");
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "Tümü" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: Lead["status"][] = ["Yeni", "Arandı", "Planlandı", "Tamamlandı"];

  return (
    <div className="space-y-6">
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between paper-card rounded-xl p-4 bg-card">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="İsim, telefon veya mesaj ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-background border border-border pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto py-1 sm:py-0">
          {["Tümü", ...statuses].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border shrink-0 transition-colors ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground hover:text-foreground border-border"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="paper-card rounded-2xl overflow-hidden bg-card border border-border">
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary/40 border-b border-border text-muted-foreground font-medium uppercase tracking-wider">
                  <th className="p-4">Müşteri</th>
                  <th className="p-4">İrtibat</th>
                  <th className="p-4">Hizmet Alanı</th>
                  <th className="p-4">Kayıt Tarihi</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/15 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                          {lead.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm ink-text">{lead.name}</div>
                          {lead.message && (
                            <div className="text-[10px] text-muted-foreground truncate max-w-[200px] mt-0.5">
                              {lead.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono font-medium text-foreground">{lead.phone}</td>
                    <td className="p-4">
                      <span className="font-medium text-foreground bg-secondary px-2.5 py-1 rounded-md">
                        {lead.service}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none border ${
                          lead.status === "Yeni"
                            ? "bg-accent/15 text-accent border-accent/25"
                            : lead.status === "Arandı"
                            ? "bg-sky-500/10 text-sky-600 border-sky-500/20"
                            : lead.status === "Planlandı"
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        }`}
                      >
                        {statuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition"
                          title="Detayları İncele"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center border border-border text-destructive hover:bg-destructive/10 transition"
                          title="Sil"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Arama kriterlerine uygun talep kaydı bulunamadı.
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg paper-card-lift rounded-2xl bg-card p-6 relative"
          >
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-3xl ink-text mb-4 border-b border-border pb-3">Talep Detayları</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Müşteri Adı
                  </label>
                  <span className="font-medium text-sm text-foreground flex items-center gap-1.5 mt-1">
                    <User className="h-4 w-4 text-primary shrink-0" />
                    {selectedLead.name}
                  </span>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Telefon Numarası
                  </label>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="font-medium text-sm text-primary flex items-center gap-1.5 mt-1 hover:underline"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {selectedLead.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Talep Edilen Hizmet
                  </label>
                  <span className="font-medium text-xs bg-secondary inline-block px-2.5 py-1 rounded-md mt-1">
                    {selectedLead.service}
                  </span>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Kayıt Tarihi
                  </label>
                  <span className="text-xs text-foreground/80 mt-1 block">
                    {new Date(selectedLead.createdAt).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                  Bırakılan Açıklama
                </label>
                <div className="mt-1 bg-secondary/35 border border-border p-3.5 rounded-xl text-xs text-foreground/85 leading-relaxed min-h-[70px]">
                  {selectedLead.message || "Müşteri herhangi bir ek mesaj bırakmadı."}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border mt-5">
                <div className="flex items-center gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Durum:</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead["status"])}
                    className="rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none border bg-background"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold"
                >
                  Kapat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ───────── TAB: TESTIMONIALS / REVIEWS ───────── */

function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    setReviews(db.getReviews());
  }, []);

  const resetForm = () => {
    setName("");
    setRole("");
    setText("");
    setRating(5);
    setEditingReview(null);
    setIsAdding(false);
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setName(review.name);
    setRole(review.role);
    setText(review.text);
    setRating(review.rating);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      db.deleteReview(id);
      setReviews(db.getReviews());
      toast.success("Yorum başarıyla silindi.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingReview) {
      db.updateReview({
        id: editingReview.id,
        name,
        role,
        text,
        rating,
      });
      toast.success("Yorum başarıyla güncellendi.");
    } else {
      db.addReview({
        name,
        role,
        text,
        rating,
      });
      toast.success("Yeni yorum başarıyla eklendi.");
    }
    setReviews(db.getReviews());
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-2xl ink-text">Müşteri Yorumları Listesi</h3>
        <button
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold transition hover:scale-[1.02]"
        >
          <PlusCircle className="h-4 w-4" /> Yeni Yorum Ekle
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <div key={r.id} className="paper-card rounded-2xl p-5 flex flex-col justify-between bg-card relative">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating || 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditClick(r)}
                    className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition"
                    title="Düzenle"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 rounded-lg border border-border text-destructive hover:bg-destructive/10 transition"
                    title="Sil"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed italic mb-4">
                "{r.text}"
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-border/60 pt-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                {r.name[0]}
              </div>
              <div>
                <div className="font-semibold text-xs text-foreground">{r.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Editor Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg paper-card-lift rounded-2xl bg-card p-6 relative"
          >
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-3xl ink-text mb-5 border-b border-border pb-3">
              {editingReview ? "Yorumu Düzenle" : "Yeni Yorum Ekle"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Müşteri İsmi</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="E.g., Ayşe K."
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Konum / Rol</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="E.g., Esenyurt, Pınar Mah."
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Puanlama</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                >
                  <option value={5}>5 Yıldız (Mükemmel)</option>
                  <option value={4}>4 Yıldız (Çok İyi)</option>
                  <option value={3}>3 Yıldız (Orta)</option>
                  <option value={2}>2 Yıldız (Zayıf)</option>
                  <option value={1}>1 Yıldız (Çok Kötü)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Müşteri Yorumu</label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Müşterinin bıraktığı yorum metnini girin..."
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-border text-muted-foreground hover:bg-secondary px-4 py-2 rounded-full text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-semibold"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ───────── TAB: SERVICES ───────── */

function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [detailsText, setDetailsText] = useState(""); // newline separated values

  useEffect(() => {
    setServices(db.getServices());
  }, []);

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setTitle(service.title);
    setShort(service.short);
    setDetailsText(service.details.join("\n"));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const details = detailsText
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d !== "");

    const updated: Service = {
      ...selectedService,
      title,
      short,
      details,
    };

    db.updateService(updated);
    setServices(db.getServices());
    setSelectedService(null);
    toast.success("Hizmet bilgileri güncellendi.");
  };

  return (
    <div className="space-y-6">
      <h3 className="font-display text-2xl ink-text">Hizmet Listesi</h3>
      <p className="text-xs text-muted-foreground max-w-xl -mt-4">
        Buradaki değişiklikler ana sayfadaki Hizmetler sekmesine anında yansır.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {services.map((s) => (
          <div key={s.id} className="paper-card rounded-2xl p-5 bg-card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] text-muted-foreground uppercase font-mono">ID: {s.id}</span>
                <button
                  onClick={() => handleEditClick(s)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-border text-[11px] font-semibold text-primary hover:bg-secondary transition"
                >
                  <Edit2 className="h-3 w-3" /> Düzenle
                </button>
              </div>
              <h4 className="font-display text-2xl ink-text mb-2">{s.title}</h4>
              <p className="text-xs text-foreground/75 leading-relaxed mb-4">{s.short}</p>

              <ul className="space-y-1.5 mb-4">
                {s.details.map((d, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Services Edit Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg paper-card-lift rounded-2xl bg-card p-6 relative"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-3xl ink-text mb-5 border-b border-border pb-3">Hizmeti Düzenle</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Hizmet Başlığı</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Kısa Açıklama</label>
                <textarea
                  rows={3}
                  required
                  value={short}
                  onChange={(e) => setShort(e.target.value)}
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Hizmet Maddeleri (Satır başına bir madde girin)
                </label>
                <textarea
                  rows={4}
                  required
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                  placeholder="Yem istasyonu kurumu&#10;Periyodik raporlama&#10;Geri dönüş garantisi"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-5">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="border border-border text-muted-foreground hover:bg-secondary px-4 py-2 rounded-full text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-semibold"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ───────── TAB: FAQS ───────── */

function FaqsTab() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setFaqs(db.getFAQs());
  }, []);

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setEditingFaq(null);
    setIsEditing(false);
  };

  const handleEditClick = (faq: FAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.q);
    setAnswer(faq.a);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu soruyu silmek istediğinizden emin misiniz?")) {
      db.deleteFAQ(id);
      setFaqs(db.getFAQs());
      toast.success("Soru başarıyla silindi.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      db.updateFAQ({
        id: editingFaq.id,
        q: question,
        a: answer,
      });
      toast.success("Soru başarıyla güncellendi.");
    } else {
      db.addFAQ({
        q: question,
        a: answer,
      });
      toast.success("Soru başarıyla eklendi.");
    }
    setFaqs(db.getFAQs());
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-2xl ink-text">Sıkça Sorulan Sorular</h3>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold transition hover:scale-[1.02]"
        >
          <PlusCircle className="h-4 w-4" /> Yeni Soru Ekle
        </button>
      </div>

      <div className="paper-card rounded-2xl overflow-hidden bg-card border border-border">
        {faqs.length > 0 ? (
          <div className="divide-y divide-border/60">
            {faqs.map((f) => (
              <div key={f.id} className="p-5 flex items-start gap-4 hover:bg-secondary/10 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="font-semibold text-sm text-foreground">{f.q}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{f.a}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleEditClick(f)}
                    className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition"
                    title="Düzenle"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="p-1.5 rounded-lg border border-border text-destructive hover:bg-destructive/10 transition"
                    title="Sil"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Kayıtlı soru bulunmamaktadır.
          </div>
        )}
      </div>

      {/* FAQ Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg paper-card-lift rounded-2xl bg-card p-6 relative"
          >
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-display text-3xl ink-text mb-5 border-b border-border pb-3">
              {editingFaq ? "Soruyu Düzenle" : "Yeni Soru Ekle"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Soru</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Soru metni girin..."
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Cevap</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Cevap metni girin..."
                  className="mt-1.5 w-full rounded-lg bg-background border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border mt-5">
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-border text-muted-foreground hover:bg-secondary px-4 py-2 rounded-full text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-semibold"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
