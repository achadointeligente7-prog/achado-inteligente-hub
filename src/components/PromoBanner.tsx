import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import promoBannerBg from "@/assets/promo-banner.png";
import type { Product } from "@/hooks/useProducts";

interface PromoBannerProps {
  products: Product[];
}

export function PromoBanner({ products }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const promoProducts = products.filter(
    (p) => p.tag === "oferta" || p.originalPrice
  );

  useEffect(() => {
    if (promoProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [promoProducts.length]);

  return (
    <section className="relative">
      <div className="container max-w-7xl mx-auto px-4 py-1 md:py-2 space-y-1 md:space-y-2">
        <div className="relative rounded-lg overflow-hidden aspect-[21/9] md:aspect-auto md:h-[200px]">
          <img
            src={promoBannerBg}
            alt="Promoções"
            className="w-full h-full object-contain md:object-cover object-center absolute inset-0"
          />
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
      </div>
    </section>
  );
}
