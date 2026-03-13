import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { AdminCategories } from "@/components/admin/AdminCategories";
import { AdminPaymentMethods } from "@/components/admin/AdminPaymentMethods";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminSettings } from "@/components/admin/AdminSettings";

const tabs = [
  { id: "products", label: "Produtos" },
  { id: "categories", label: "Categorias" },
  { id: "payments", label: "Pagamentos" },
  { id: "analytics", label: "Métricas" },
  { id: "settings", label: "Configurações" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("products");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Achado Inteligente" className="h-8" />
            <span className="font-display font-bold text-primary-foreground text-lg">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-primary-foreground text-sm hover:underline flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Site
            </a>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary/80">
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="bg-card border-b border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <nav className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-secondary text-secondary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="container max-w-7xl mx-auto px-4 py-6">
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "categories" && <AdminCategories />}
        {activeTab === "payments" && <AdminPaymentMethods />}
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "settings" && <AdminSettings />}
      </main>
    </div>
  );
}
