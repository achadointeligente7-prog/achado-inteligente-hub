import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface SocialLinks {
  instagram: string;
  tiktok: string;
  telegram: string;
  youtube: string;
  whatsapp_channel: string;
}

const navLinks = [
  { label: "Ofertas do dia", href: "#ofertas" },
  { label: "Produtos Virais", href: "#virais" },
  { label: "Gadgets Úteis", href: "#gadgets" },
  { label: "Barato até R$50", href: "#barato" },
  { label: "Casa", href: "#casa" },
  { label: "Cozinha", href: "#cozinha" },
  { label: "Tecnologia", href: "#tecnologia" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({ instagram: "", tiktok: "", telegram: "", youtube: "" });

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "social_links")
      .single()
      .then(({ data }) => {
        if (data?.value) setSocialLinks(data.value as unknown as SocialLinks);
      });
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top yellow bar */}
      <div className="bg-primary">
        <div className="container max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Achado Inteligente" className="h-10" />
          </a>

          <div className="flex-1 hidden md:block" />

          <div className="hidden md:flex items-center gap-5 text-primary-foreground text-sm shrink-0">
            <a href={socialLinks.instagram || "#"} target={socialLinks.instagram ? "_blank" : undefined} rel={socialLinks.instagram ? "noopener noreferrer" : undefined} className="hover:underline">Instagram</a>
            <a href={socialLinks.tiktok || "#"} target={socialLinks.tiktok ? "_blank" : undefined} rel={socialLinks.tiktok ? "noopener noreferrer" : undefined} className="hover:underline">TikTok</a>
            <a href={socialLinks.telegram || "#"} target={socialLinks.telegram ? "_blank" : undefined} rel={socialLinks.telegram ? "noopener noreferrer" : undefined} className="hover:underline">Telegram</a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-primary-foreground"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-card border-b border-border hidden md:block">
        <div className="container max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-foreground hover:text-secondary transition-colors whitespace-nowrap border-r border-border"
            >
              Categorias <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Category dropdown */}
      {isCategoryOpen && (
        <div className="absolute top-full left-0 w-full bg-card border-b border-border shadow-lg z-50 hidden md:block">
          <div className="container max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/categoria/${cat.slug}`}
                  className="flex items-center gap-2.5 p-3 rounded-md hover:bg-muted transition-all"
                  onClick={() => setIsCategoryOpen(false)}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border max-h-[70vh] overflow-y-auto">
          <div className="p-4 space-y-1">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-4 pr-10 py-2.5 rounded-sm bg-muted text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <p className="text-xs text-muted-foreground px-3 mb-2 font-semibold uppercase">Categorias</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/categoria/${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
