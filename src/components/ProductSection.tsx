import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  icon?: string;
  id?: string;
}

export function ProductSection({ title, subtitle, products, icon, id }: ProductSectionProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground flex items-center gap-2">
              {icon && <span>{icon}</span>}
              {title}
            </h2>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <a href="#" className="text-sm font-semibold text-secondary hover:underline whitespace-nowrap">
            Ver todos →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
