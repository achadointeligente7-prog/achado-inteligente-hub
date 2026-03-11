import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductSection } from "@/components/ProductSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { products, loading } = useProducts();

  const viralProducts = products.filter((p) => p.tag === "viral" || p.tag === "top");
  const cheapProducts = products.filter((p) => parseFloat(p.price.replace(/[^\d,]/g, "").replace(",", ".")) <= 50);
  const techProducts = products.filter((p) => p.category === "tecnologia");
  const homeProducts = products.filter((p) => p.category === "casa" || p.category === "cozinha");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <CategoryGrid />
        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Carregando produtos...</div>
        ) : (
          <>
            <ProductSection
              id="virais"
              title="Produtos Virais da Semana"
              subtitle="Os mais comentados nas redes sociais"
              icon="🔥"
              products={viralProducts}
            />
            <ProductSection
              id="ofertas"
              title="Achados Baratos"
              subtitle="Produtos incríveis por até R$50"
              icon="💰"
              products={cheapProducts}
            />
            <ProductSection
              id="tecnologia"
              title="Tecnologia Útil"
              subtitle="Gadgets que facilitam sua vida"
              icon="⚡"
              products={techProducts}
            />
            <ProductSection
              id="casa"
              title="Casa & Cozinha"
              subtitle="Organize e transforme seus espaços"
              icon="🏠"
              products={homeProducts}
            />
            <ProductSection
              id="top"
              title="Top 10 da Semana"
              subtitle="Os mais vendidos e recomendados"
              icon="🏆"
              products={products.slice(0, 4)}
            />
          </>
        )}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
