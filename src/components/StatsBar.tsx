import { Zap, Clock, TrendingUp } from "lucide-react";

const stats = [
  { icon: Zap, value: "500+", label: "Produtos selecionados" },
  { icon: Clock, value: "24h", label: "Ofertas atualizadas" },
  { icon: TrendingUp, value: "70%", label: "Economia garantida" },
];

export function StatsBar() {
  return (
    <section className="bg-card border-y border-border">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="h-6 w-6 text-secondary mb-1" />
              <span className="font-display font-bold text-xl text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
