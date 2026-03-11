import heroMain from "@/assets/hero-main.png";
import heroTop from "@/assets/hero-top.png";
import heroOfertas from "@/assets/hero-ofertas.png";

export function HeroSection() {
  return (
    <section className="bg-primary">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main banner */}
          <div className="lg:col-span-2 relative rounded-md overflow-hidden min-h-[280px] md:min-h-[400px]">
            <a href="#ofertas" className="block w-full h-full">
              <img
                src={heroMain}
                alt="Os melhores achados da internet - Produtos baratos, úteis e virais. Economize até 70%!"
                className="w-full h-full object-cover rounded-md"
              />
            </a>
          </div>

          {/* Side banners */}
          <div className="flex flex-col gap-4">
            <a href="#top" className="flex-1 rounded-md overflow-hidden min-h-[160px] md:min-h-[192px]">
              <img
                src={heroTop}
                alt="Top da Semana - Os mais vendidos e recomendados"
                className="w-full h-full object-cover rounded-md"
              />
            </a>
            <a href="#ofertas" className="flex-1 rounded-md overflow-hidden min-h-[160px] md:min-h-[192px]">
              <img
                src={heroOfertas}
                alt="Ofertas Relâmpago - Até 70% OFF por tempo limitado"
                className="w-full h-full object-cover rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
