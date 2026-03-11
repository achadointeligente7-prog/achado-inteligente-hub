import type { Product } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ChevronRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  icon?: string;
  id?: string;
}

export function ProductSection({ title, subtitle, products, icon, id }: ProductSectionProps) {
  return (
    <section id={id} className="py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="bg-card rounded-md shadow-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                {icon && <span>{icon}</span>}
                {title}
              </h2>
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            <a href="#" className="flex items-center text-sm font-medium text-secondary hover:underline whitespace-nowrap">
              Ver todos <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
