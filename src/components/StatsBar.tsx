export function StatsBar() {
  const stats = [
    { icon: "📦", label: "Frete grátis", sub: "em milhares de produtos" },
    { icon: "🔒", label: "Compra segura", sub: "links verificados" },
    { icon: "⭐", label: "+500 produtos", sub: "selecionados com curadoria" },
    { icon: "🔄", label: "Atualizado 24h", sub: "ofertas renovadas diariamente" },
  ];

  return (
    <section className="bg-card border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
