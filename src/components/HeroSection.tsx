export function HeroSection() {
  return (
    <section className="bg-primary">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        {/* Banner carousel area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main banner */}
          <div className="lg:col-span-2 relative rounded-md overflow-hidden bg-gradient-to-br from-brand-dark to-brand-medium min-h-[280px] md:min-h-[340px] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
            <div className="relative z-10 p-8 md:p-12 max-w-lg space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                🔍 ATUALIZADO HOJE
              </span>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-card leading-tight">
                Os melhores achados da internet
              </h1>
              <p className="text-card/80 text-sm md:text-base">
                Produtos baratos, úteis e virais. Economize até 70%!
              </p>
              <a
                href="#ofertas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all"
              >
                Ver Achados de Hoje →
              </a>
            </div>
          </div>

          {/* Side banners */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-md bg-secondary p-6 flex flex-col justify-center min-h-[160px]">
              <span className="text-3xl mb-2">🏆</span>
              <h3 className="font-display font-bold text-lg text-secondary-foreground">Top da Semana</h3>
              <p className="text-secondary-foreground/70 text-sm mt-1">Os mais vendidos e recomendados</p>
              <a href="#top" className="text-secondary-foreground font-semibold text-sm mt-3 hover:underline">
                Ver ranking →
              </a>
            </div>
            <div className="flex-1 rounded-md bg-destructive p-6 flex flex-col justify-center min-h-[160px]">
              <span className="text-3xl mb-2">⚡</span>
              <h3 className="font-display font-bold text-lg text-destructive-foreground">Ofertas Relâmpago</h3>
              <p className="text-destructive-foreground/70 text-sm mt-1">Até 70% OFF por tempo limitado</p>
              <a href="#ofertas" className="text-destructive-foreground font-semibold text-sm mt-3 hover:underline">
                Aproveitar →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
