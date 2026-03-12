import heroMain from "@/assets/hero-main.png";
import heroTop from "@/assets/hero-top.png";
import heroOfertas from "@/assets/hero-ofertas.png";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-primary">
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Main banner */}
          <div className="lg:col-span-2 relative rounded-md overflow-hidden min-h-[200px] md:min-h-[280px]">
            <img
              src={heroMain}
              alt="Os melhores achados da internet"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-5">
              <a
                href="#ofertas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm rounded-sm hover:brightness-110 transition-all shadow-lg"
              >
                Ver Achados de Hoje <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Side banners */}
          <div className="flex flex-col gap-3">
            <div className="relative flex-1 rounded-md overflow-hidden min-h-[120px] md:min-h-[132px]">
              <img
                src={heroTop}
                alt="Top da Semana"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent flex items-end p-4">
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground font-display font-bold text-xs rounded-sm hover:brightness-110 transition-all shadow-lg"
                >
                  Ver ranking <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="relative flex-1 rounded-md overflow-hidden min-h-[120px] md:min-h-[132px]">
              <img
                src={heroOfertas}
                alt="Ofertas Relâmpago"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-destructive/70 to-transparent flex items-end p-4">
                <a
                  href="#virais"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display font-bold text-xs rounded-sm hover:brightness-110 transition-all shadow-lg"
                >
                  Aproveitar <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
