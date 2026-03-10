import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductSection } from "@/components/ProductSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";

const Index = () => {
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
        <ProductSection
          id="virais"
          title="Produtos Virais da Semana"
          subtitle="Os mais comentados nas redes sociais"
          icon="🔥"
          products={viralProducts}
        />
        <CategoryGrid />
        <ProductSection
          id="ofertas"
          title="Achados Baratos"
          subtitle="Produtos incríveis por até R$50"
          icon="💰"
          products={cheapProducts}
        />
        <div className="bg-muted/30">
          <ProductSection
            id="tecnologia"
            title="Tecnologia Útil"
            subtitle="Gadgets que facilitam sua vida"
            icon="⚡"
            products={techProducts}
          />
        </div>
        <ProductSection
          id="casa"
          title="Casa & Cozinha"
          subtitle="Organize e transforme seus espaços"
          icon="🏠"
          products={homeProducts}
        />
        <div className="bg-muted/30">
          <ProductSection
            id="top"
            title="Top 10 da Semana"
            subtitle="Os mais vendidos e recomendados"
            icon="🏆"
            products={products.slice(0, 4)}
          />
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
