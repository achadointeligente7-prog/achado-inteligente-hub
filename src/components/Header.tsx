import { useState, useEffect, useCallback } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/hooks/useProducts";

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

interface HeaderProps {
  products?: Product[];
}

export function Header({ products = [] }: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({ instagram: "", tiktok: "", telegram: "", youtube: "", whatsapp_channel: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

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

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      const q = query.toLowerCase();
      const results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
      setSearchResults(results.slice(0, 6));
      setShowResults(true);
    },
    [products]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/produto/${searchResults[0].id}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const searchBar = (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        onFocus={() => searchQuery.trim().length >= 2 && setShowResults(true)}
        placeholder="Buscar produtos, marcas e muito mais..."
        className="w-full pl-4 pr-12 py-2.5 rounded-lg bg-card text-foreground text-sm shadow-hero focus:outline-none focus:ring-2 focus:ring-ring border border-border"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 bg-primary hover:bg-primary/90 transition-colors rounded-r-lg"
      >
        <Search className="h-4 w-4 text-primary-foreground" />
      </button>
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/produto/${product.id}`}
              className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
              onClick={() => {
                setShowResults(false);
                setSearchQuery("");
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-10 w-10 object-contain rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground line-clamp-1">{product.name}</p>
                <p className="text-xs font-bold text-secondary">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Top yellow bar */}
      <div className="bg-primary">
        <div className="container max-w-7xl mx-auto py-1 flex items-center gap-4 px-4">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Achado Inteligente" className="h-20 md:h-24 my-0" />
          </a>

          <div className="flex-1 hidden md:flex items-center justify-center max-w-xl mx-4">
            {searchBar}
          </div>

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
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
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
            <div className="mb-3">
              {searchBar}
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className="block px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.icon} {cat.name}
              </Link>
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
