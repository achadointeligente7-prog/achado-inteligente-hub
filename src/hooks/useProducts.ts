import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { products as fallbackProducts, type Product as LocalProduct } from "@/data/products";

export type DbProduct = Tables<"products">;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tag?: "viral" | "oferta" | "novo" | "top";
  affiliateUrl: string;
}

function dbToProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    originalPrice: p.original_price || undefined,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image_url,
    category: p.category,
    tag: (p.tag as Product["tag"]) || undefined,
    affiliateUrl: p.affiliate_url,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setProducts(data.map(dbToProduct));
      } else {
        // Fallback to local data if DB is empty
        setProducts(fallbackProducts);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { products, loading };
}
