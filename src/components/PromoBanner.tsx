import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import promoBannerBg from "@/assets/promo-banner.png";
import type { Product } from "@/hooks/useProducts";

interface PromoBannerProps {
  products: Product[];
}

export function PromoBanner({ products }: PromoBannerProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Filter promo products (with tag oferta or originalPrice)
  const promoProducts = products.filter(
    (p) => p.tag === "oferta" || p.originalPrice
  );

  // Auto-rotate products
  useEffect(() => {
    if (promoProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [promoProducts.length]);

  // Search handler
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

  return (
    <section className="relative">
      <div className="container max-w-7xl mx-auto px-4 py-1 md:py-2 space-y-1 md:space-y-2">
        <div className="relative rounded-lg overflow-hidden aspect-[21/9] md:aspect-auto md:h-[200px]">
          {/* Banner background */}
          <img
            src={promoBannerBg}
            alt="Promoções"
            className="w-full h-full object-contain md:object-cover object-center absolute inset-0"
          />

          {/* Rotating products in center white area */}
          <div className="absolute inset-0 flex items-center justify-center px-0 py-0">
            <div className="w-[55%] md:w-[50%] h-[70%] md:h-[70%] flex items-center justify-center">
              {promoProducts.length > 0 && (
                <Link
                  to={`/produto/${promoProducts[currentIndex]?.id}`}
                  className="flex items-center gap-3 md:gap-4 transition-opacity duration-500"
                >
                  <img
                    src={promoProducts[currentIndex]?.image}
                    alt={promoProducts[currentIndex]?.name}
                    className="h-20 w-20 md:h-32 md:w-32 object-contain rounded"
                  />
                  <div className="max-w-[150px] md:max-w-[200px]">
                    <p className="text-[10px] md:text-xs text-foreground font-semibold line-clamp-2">
                      {promoProducts[currentIndex]?.name}
                    </p>
                    <p className="text-xs md:text-sm font-bold text-secondary mt-1">
                      {promoProducts[currentIndex]?.price}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Animated video banner */}
        <div className="rounded-lg overflow-hidden">
          <video
            src="/videos/promo-animated.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-lg my-0 py-0"
          />
        </div>

        {/* Search bar overlapping bottom of banner */}
        <div className="relative -mt-5 mx-auto max-w-2xl z-10">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => searchQuery.trim().length >= 2 && setShowResults(true)}
              placeholder="Buscar produtos, marcas e muito mais..."
              className="w-full pl-4 pr-12 py-3 rounded-lg bg-card text-foreground text-sm shadow-hero focus:outline-none focus:ring-2 focus:ring-ring border border-border"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-primary hover:bg-primary/90 transition-colors rounded-r-lg"
            >
              <Search className="h-4 w-4 text-primary-foreground" />
            </button>
          </form>

          {/* Search results dropdown */}
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
        </div>
      </div>
    </section>
  );
}
