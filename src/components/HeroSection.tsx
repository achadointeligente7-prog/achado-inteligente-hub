import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 opacity-20">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      <div className="relative container max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-sm font-medium text-accent">
            🔍 Atualizado hoje
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight">
            Os melhores achados da internet em um só lugar
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
            Descubra produtos baratos, úteis e virais que podem facilitar sua vida.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#ofertas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-bold hover:brightness-110 transition-all animate-pulse-glow"
            >
              Ver Achados de Hoje 🔥
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all"
            >
              Top da Semana 🏆
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4 text-primary-foreground/60 text-sm">
            <span>✅ +500 produtos selecionados</span>
            <span>✅ Atualizado diariamente</span>
          </div>
        </div>
      </div>
    </section>
  );
}
