import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/hooks/useProducts";
import { ChevronLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

function dbToProduct(p: any): Product {
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
    tag: p.tag || undefined,
    affiliateUrl: p.affiliate_url,
  };
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);

      // Fetch category info
      const { data: catData } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (catData) setCategory(catData);

      // Fetch products matching this category slug
      const { data: prodData } = await supabase
        .from("products")
        .select("*")
        .eq("category", slug)
        .order("created_at", { ascending: false });

      if (prodData) setProducts(prodData.map(dbToProduct));
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar
          </Link>

          <div className="bg-card rounded-md shadow-card p-5 mb-6">
            <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              {category?.icon && <span className="text-3xl">{category.icon}</span>}
              {category?.name || slug}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>

          {loading ? (
            <div className="py-16 text-center text-muted-foreground">Carregando produtos...</div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              Nenhum produto nesta categoria ainda.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
