import { useEffect, useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PopupConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  whatsapp_url: string;
  delay_seconds: number;
  show_email_field: boolean;
  show_whatsapp_button: boolean;
}

interface SocialLinks {
  whatsapp_channel?: string;
}

const defaultConfig: PopupConfig = {
  enabled: true,
  title: "🔥 Ofertas Exclusivas!",
  subtitle: "Receba os melhores achados e entre no nosso grupo do WhatsApp",
  whatsapp_url: "",
  delay_seconds: 5,
  show_email_field: true,
  show_whatsapp_button: true,
};

export function LeadCapturePopup() {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState<PopupConfig>(defaultConfig);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappChannel, setWhatsappChannel] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup_dismissed");
    if (dismissed) return;

    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["popup_config", "social_links"])
      .then(({ data }) => {
        if (data) {
          const popup = data.find((d) => d.key === "popup_config");
          if (popup?.value) {
            const cfg = popup.value as unknown as PopupConfig;
            setConfig(cfg);
            if (cfg.enabled) {
              const timer = setTimeout(() => setShow(true), (cfg.delay_seconds || 5) * 1000);
              return () => clearTimeout(timer);
            }
          }
          const social = data.find((d) => d.key === "social_links");
          if (social?.value) {
            const links = social.value as unknown as SocialLinks;
            setWhatsappChannel(links.whatsapp_channel || "");
          }
        }
      });
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("popup_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await supabase.from("newsletter_subscribers").insert({ email });
    setSubmitted(true);
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-foreground/50" onClick={handleClose} />
      <div className="relative bg-card rounded-lg shadow-card-hover max-w-md w-full p-6 animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-3">
          <h2 className="font-display font-bold text-xl text-foreground">{config.title}</h2>
          <p className="text-sm text-muted-foreground">{config.subtitle}</p>

          {config.show_email_field && !submitted && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                className="px-4 py-3 rounded-sm text-sm bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                disabled={loading}
                className="cta-button inline-flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-sm text-sm"
              >
                <Send className="h-4 w-4" />
                {loading ? "Enviando..." : "Quero Receber Ofertas"}
              </button>
            </form>
          )}

          {submitted && (
            <div className="bg-secondary/10 rounded-md p-4 mt-4">
              <p className="text-sm font-medium text-secondary">✅ E-mail cadastrado com sucesso!</p>
            </div>
          )}

          {config.show_whatsapp_button && config.whatsapp_url && (
            <a
              href={config.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-bold rounded-sm text-sm transition-all mt-3"
            >
              <MessageCircle className="h-4 w-4" />
              Entrar no Grupo do WhatsApp
            </a>
          )}

          {whatsappChannel && (
            <a
              href={whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-bold rounded-sm text-sm transition-all mt-3"
            >
              <MessageCircle className="h-4 w-4" />
              Entrar no Canal do WhatsApp
            </a>
          )}

          <p className="text-[11px] text-muted-foreground mt-2">
            Não enviamos spam. Você pode sair a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
