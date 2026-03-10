import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 bg-hero-gradient">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground mb-3">
          📬 Receba os melhores achados no seu e-mail
        </h2>
        <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
          Ofertas exclusivas, produtos virais e promoções imperdíveis toda semana.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            className="flex-1 px-4 py-3 rounded-lg text-sm bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:brightness-110 transition-all"
          >
            <Send className="h-4 w-4" /> Quero Receber
          </button>
        </form>
      </div>
    </section>
  );
}
