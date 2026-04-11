import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductReviews } from "@/components/ProductReviews";
import { Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import type { Product } from "@/hooks/useProducts";
import { useTrackVisit } from "@/hooks/useTrackVisit";

interface ProductImage {
  id: string;
  image_url: string;
  sort_order: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  useTrackVisit(`/produto/${id}`);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      const { data: p } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (p) {
        const prod: Product = {
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
        setProduct(prod);

        // Fetch gallery images
        const { data: imgs } = await supabase
          .from("product_images")
          .select("*")
          .eq("product_id", id)
          .order("sort_order");
        setImages(imgs || []);

        // Fetch related products
        const { data: related } = await supabase
          .from("products")
          .select("*")
          .eq("category", p.category)
          .neq("id", id)
          .limit(4);

        if (related) {
          setRelatedProducts(
            related.map((r) => ({
              id: r.id,
              name: r.name,
              description: r.description,
              price: r.price,
              originalPrice: r.original_price || undefined,
              rating: r.rating,
              reviews: r.reviews,
              image: r.image_url,
              category: r.category,
              tag: (r.tag as Product["tag"]) || undefined,
              affiliateUrl: r.affiliate_url,
            }))
          );
        }
      }
      setLoading(false);
    };
    fetchProduct();
    setCurrentImage(0);
  }, [id]);

  const allImages = product
    ? [product.image, ...images.map((i) => i.image_url)].filter(Boolean)
    : [];

  const handleClick = () => {
    if (!product) return;
    supabase
      .from("product_clicks")
      .insert({
        product_id: product.id,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      })
      .then(() => {});
  };

  const discount = product?.originalPrice
    ? Math.round(
        (1 -
          parseFloat(product.price.replace(/[^\d,]/g, "").replace(",", ".")) /
            parseFloat(product.originalPrice.replace(/[^\d,]/g, "").replace(",", "."))) *
          100
      )
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-20 text-center text-muted-foreground">Carregando...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="py-20 text-center">
          <p className="text-muted-foreground mb-4">Produto não encontrado</p>
          <Link to="/" className="text-secondary hover:underline">Voltar à loja</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative bg-card rounded-md overflow-hidden aspect-square flex items-center justify-center p-6 shadow-card">
              <img
                src={allImages[currentImage] || product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-card transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card rounded-full p-2 shadow-card transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-foreground" />
                  </button>
                </>
              )}
              {product.tag && (
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-sm text-xs font-bold uppercase ${
                  product.tag === "viral" ? "bg-destructive text-destructive-foreground" :
                  product.tag === "oferta" ? "bg-primary text-primary-foreground" :
                  product.tag === "novo" ? "bg-secondary text-secondary-foreground" :
                  "bg-foreground text-card"
                }`}>
                  {product.tag === "viral" ? "🔥 Viral" : product.tag === "oferta" ? "⚡ Oferta" : product.tag === "novo" ? "✨ Novo" : "🏆 Top"}
                </span>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      i === currentImage ? "border-secondary shadow-card-hover" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="font-display font-bold text-2xl lg:text-3xl text-foreground">{product.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} avaliações)</span>
            </div>

            {discount && (
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-bold rounded-sm">
                {discount}% OFF
              </span>
            )}

            <div className="space-y-1">
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
              )}
              <p className="font-display font-bold text-3xl text-foreground">{product.price}</p>
              <p className="text-sm text-secondary font-medium">em até 12x sem juros</p>
              <p className="text-sm text-muted-foreground">💳 Pague na loja oficial</p>
            </div>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="cta-button block w-full text-center font-bold py-4 rounded-sm text-lg mt-4"
            >
              🛒 Ver produto
            </a>

            <DescriptionBlock description={product.description} />

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: "🔒", text: "Compra segura" },
                { icon: "🏪", text: "Loja oficial" },
                { icon: "🔄", text: "Fácil devolução" },
              ].map((item) => (
                <div key={item.text} className="bg-card rounded-md p-3 text-center shadow-card">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-xs text-muted-foreground mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-8">
          <ProductReviews productId={product.id} />
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display font-bold text-xl text-foreground mb-5">
              🔗 Produtos Semelhantes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
