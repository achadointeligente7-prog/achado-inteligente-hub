import { useMemo } from "react";
import type { Product } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

interface HeroSectionProps {
  products: Product[];
}

export function HeroSection({ products }: HeroSectionProps) {
  // Rotate products every 5 hours based on timestamp
  const displayProducts = useMemo(() => {
    if (products.length === 0) return [];
    const fiveHoursMs = 5 * 60 * 60 * 1000;
    const rotationIndex = Math.floor(Date.now() / fiveHoursMs);
    const pageSize = 4;
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
    const currentPage = rotationIndex % totalPages;
    const start = currentPage * pageSize;
    return products.slice(start, start + pageSize);
  }, [products]);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-4">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="bg-card rounded-md shadow-card p-5">
          <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2 mb-4">
            ✨ Destaques para Você
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
