import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function StatsBar() {
  const [paymentMethods, setPaymentMethods] = useState<{ name: string; icon: string }[]>([]);

  useEffect(() => {
    supabase
      .from("payment_methods")
      .select("name, icon")
      .eq("enabled", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setPaymentMethods(data);
      });
  }, []);

  const stats = [
    { icon: "🔒", label: "Compra segura", sub: "links verificados" },
    { icon: "⭐", label: "+500 produtos", sub: "selecionados com curadoria" },
    { icon: "🔄", label: "Atualizado 24h", sub: "ofertas renovadas diariamente" },
    ...(paymentMethods.length > 0
      ? [{ icon: "💳", label: "Pagamento na loja", sub: paymentMethods.map((p) => p.name).join(", ") }]
      : []),
  ];

  return (
    <section className="bg-card border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 py-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-row flex items-start justify-start gap-[10px] rounded-full shadow-2xl">
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
