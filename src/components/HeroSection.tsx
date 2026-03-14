import heroNew1 from "@/assets/hero-new-1.png";
import heroNew2 from "@/assets/hero-new-2.png";

export function HeroSection() {
  return (
    <section className="bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primeiro banner */}
          <div className="relative rounded-lg overflow-hidden h-[180px] md:h-[200px]">
            <img
              src={heroNew1}
              alt="Achado Inteligente - Achadinhos da internet e produtos com grandes descontos"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Segundo banner */}
          <div className="relative rounded-lg overflow-hidden h-[180px] md:h-[200px]">
            <img
              src={heroNew2}
              alt="Achados Inteligentes da Internet - Descubra produtos incríveis com os melhores preços"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
