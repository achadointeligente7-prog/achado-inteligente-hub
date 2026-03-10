import { Star } from "lucide-react";
import type { Product } from "@/data/products";

const tagStyles: Record<string, string> = {
  viral: "bg-destructive text-destructive-foreground",
  oferta: "bg-accent text-accent-foreground",
  novo: "bg-secondary text-secondary-foreground",
  top: "bg-primary text-primary-foreground",
};

const tagLabels: Record<string, string> = {
  viral: "🔥 Viral",
  oferta: "⚡ Oferta",
  novo: "✨ Novo",
  top: "🏆 Top",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {product.tag && (
        <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold ${tagStyles[product.tag]}`}>
          {tagLabels[product.tag]}
        </span>
      )}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display font-semibold text-foreground leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-secondary">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
          )}
        </div>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-accent text-accent-foreground font-semibold py-2.5 rounded-md hover:brightness-110 transition-all text-sm mt-2"
        >
          Ver preço na loja →
        </a>
      </div>
    </div>
  );
}
