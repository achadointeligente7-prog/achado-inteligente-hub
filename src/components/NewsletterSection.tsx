import { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await supabase.from("newsletter_subscribers").insert({ email });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="bg-secondary rounded-md p-8 md:p-12 text-center">
          <h2 className="font-display font-bold text-2xl text-secondary-foreground mb-2">
            📬 Receba os melhores achados no seu e-mail
          </h2>
          <p className="text-secondary-foreground/70 mb-6 max-w-md mx-auto text-sm">
            Ofertas exclusivas, produtos virais e promoções toda semana.
          </p>
          {submitted ? (
            <p className="text-secondary-foreground font-semibold">✅ E-mail cadastrado com sucesso!</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                className="flex-1 px-4 py-3 rounded-sm text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-sm hover:brightness-110 transition-all text-sm"
              >
                <Send className="h-4 w-4" /> {loading ? "Enviando..." : "Quero Receber"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
