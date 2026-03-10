import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/logo.png";
import { categories } from "@/data/products";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Produtos Virais", href: "#virais" },
  { label: "Ofertas do Dia", href: "#ofertas" },
  { label: "Top da Semana", href: "#top" },
  { label: "Blog", href: "#blog" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <p className="text-primary-foreground text-xs font-medium">
            🔥 Ofertas atualizadas diariamente — Economize até 70%!
          </p>
          <div className="hidden md:flex items-center gap-4 text-primary-foreground text-xs">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">TikTok</a>
            <a href="#" className="hover:text-accent transition-colors">YouTube</a>
            <a href="#" className="hover:text-accent transition-colors">Telegram</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Achado Inteligente" className="h-10 w-10" />
          <div className="hidden sm:block">
            <span className="font-display font-bold text-lg text-foreground leading-none">Achado</span>
            <span className="font-display font-bold text-lg text-secondary leading-none ml-1">Inteligente</span>
          </div>
        </a>

        {/* Search bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos... ex: air fryer barata, fone bluetooth"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
            />
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-muted"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Category bar */}
      <div className="border-t border-border hidden md:block">
        <div className="container max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 py-1 overflow-x-auto">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors shrink-0"
            >
              <Menu className="h-4 w-4" /> Categorias
            </button>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-secondary transition-colors whitespace-nowrap"
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
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted hover:bg-secondary/10 hover:text-secondary transition-all"
                  onClick={() => setIsCategoryOpen(false)}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="p-4 space-y-2">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-sm"
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <p className="text-xs text-muted-foreground px-3 mb-2 font-semibold">Categorias</p>
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
