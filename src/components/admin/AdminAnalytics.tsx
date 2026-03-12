import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, MousePointerClick, Eye, TrendingUp, TrendingDown } from "lucide-react";

interface ClickStats {
  product_id: string;
  product_name: string;
  click_count: number;
}

export function AdminAnalytics() {
  const [totalVisits, setTotalVisits] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [topProducts, setTopProducts] = useState<ClickStats[]>([]);
  const [leastProducts, setLeastProducts] = useState<ClickStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Fetch total visits
    const { count: visitCount } = await supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true });

    // Fetch total clicks
    const { count: clickCount } = await supabase
      .from("product_clicks")
      .select("*", { count: "exact", head: true });

    // Fetch clicks per product
    const { data: clicks } = await supabase
      .from("product_clicks")
      .select("product_id");

    const { data: products } = await supabase
      .from("products")
      .select("id, name");

    if (clicks && products) {
      const clickMap: Record<string, number> = {};
      clicks.forEach((c) => {
        clickMap[c.product_id] = (clickMap[c.product_id] || 0) + 1;
      });

      const productStats: ClickStats[] = products.map((p) => ({
        product_id: p.id,
        product_name: p.name,
        click_count: clickMap[p.id] || 0,
      }));

      const sorted = [...productStats].sort((a, b) => b.click_count - a.click_count);
      setTopProducts(sorted.slice(0, 10));
      setLeastProducts([...sorted].reverse().slice(0, 10));
    }

    setTotalVisits(visitCount || 0);
    setTotalClicks(clickCount || 0);
    setLoading(false);
  };

  if (loading) {
    return <div className="py-16 text-center text-muted-foreground">Carregando métricas...</div>;
  }

  return (
    <>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">Métricas de Desempenho</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg shadow-card p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-secondary/10">
            <Eye className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Visitantes</p>
            <p className="font-display font-bold text-2xl text-foreground">{totalVisits.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-card p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/20">
            <MousePointerClick className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cliques em Produtos</p>
            <p className="font-display font-bold text-2xl text-foreground">{totalClicks.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-card p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent/10">
            <BarChart3 className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Taxa de Cliques</p>
            <p className="font-display font-bold text-2xl text-foreground">
              {totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(1) : "0"}%
            </p>
          </div>
        </div>
      </div>

      {/* Product rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-card p-5">
          <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" /> Produtos Mais Clicados
          </h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum dado disponível ainda.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.product_id} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{p.product_name}</p>
                  </div>
                  <span className="text-sm font-semibold text-secondary">{p.click_count} cliques</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-lg shadow-card p-5">
          <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-destructive" /> Produtos Menos Clicados
          </h2>
          {leastProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum dado disponível ainda.</p>
          ) : (
            <div className="space-y-3">
              {leastProducts.map((p, i) => (
                <div key={p.product_id} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{p.product_name}</p>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">{p.click_count} cliques</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
