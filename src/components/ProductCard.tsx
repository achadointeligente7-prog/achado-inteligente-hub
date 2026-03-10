import { Star } from "lucide-react";
import type { Product } from "@/data/products";

const tagStyles: Record<string, string> = {
  viral: "bg-destructive text-destructive-foreground",
  oferta: "bg-primary text-primary-foreground",
  novo: "bg-secondary text-secondary-foreground",
  top: "bg-foreground text-card",
};

const tagLabels: Record<string, string> = {
  viral: "🔥 Viral",
  oferta: "⚡ Oferta",
  novo: "✨ Novo",
  top: "🏆 Top",
};

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        (1 -
          parseFloat(product.price.replace(/[^\d,]/g, "").replace(",", ".")) /
            parseFloat(product.originalPrice.replace(/[^\d,]/g, "").replace(",", "."))) *
          100
      )
    : null;

  return (
    <div className="group bg-card rounded-md overflow-hidden shadow-card hover:shadow-card-hover transition-all">
      <div className="relative">
        {product.tag && (
          <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase ${tagStyles[product.tag]}`}>
            {tagLabels[product.tag]}
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-[10px] font-bold">
            {discount}% OFF
          </span>
        )}
        <div className="aspect-square overflow-hidden bg-card p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm text-foreground leading-snug line-clamp-2">
          {product.name}
        </h3>
        {product.originalPrice && (
          <p className="text-xs text-muted-foreground line-through">{product.originalPrice}</p>
        )}
        <p className="font-display font-bold text-xl text-foreground">{product.price}</p>
        <p className="text-[11px] text-secondary font-medium">em até 12x sem juros</p>
        <p className="text-[11px] text-secondary">Frete grátis</p>
        <div className="flex items-center gap-0.5 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews.toLocaleString()})</span>
        </div>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-secondary text-secondary-foreground font-semibold py-2 rounded-sm hover:brightness-110 transition-all text-sm mt-2"
        >
          Ver preço na loja
        </a>
      </div>
    </div>
  );
}
