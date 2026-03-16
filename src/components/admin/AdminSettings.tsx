import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  instagram: string;
  tiktok: string;
  telegram: string;
  youtube: string;
}

const defaultSocialLinks: SocialLinks = {
  instagram: "",
  tiktok: "",
  telegram: "",
  youtube: "",
};

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
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

export function AdminSettings() {
  const [config, setConfig] = useState<PopupConfig>(defaultConfig);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(defaultSocialLinks);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);
  const [savedSocial, setSavedSocial] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["popup_config", "social_links"])
      .then(({ data }) => {
        if (data) {
          const popup = data.find((d) => d.key === "popup_config");
          if (popup?.value) setConfig(popup.value as unknown as PopupConfig);
          const social = data.find((d) => d.key === "social_links");
          if (social?.value) setSocialLinks(social.value as unknown as SocialLinks);
        }
      });

    supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setSubscribers(data);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from("site_settings")
      .update({ value: JSON.parse(JSON.stringify(config)), updated_at: new Date().toISOString() })
      .eq("key", "popup_config");
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveSocial = async () => {
    setSavingSocial(true);
    // upsert social_links setting
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "social_links")
      .single();

    if (existing) {
      await supabase
        .from("site_settings")
        .update({ value: JSON.parse(JSON.stringify(socialLinks)), updated_at: new Date().toISOString() })
        .eq("key", "social_links");
    } else {
      await supabase
        .from("site_settings")
        .insert({ key: "social_links", value: JSON.parse(JSON.stringify(socialLinks)) });
    }
    setSavingSocial(false);
    setSavedSocial(true);
    setTimeout(() => setSavedSocial(false), 2000);
  };

  return (
    <>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">Configurações do Pop-up</h1>

      <div className="bg-card rounded-lg shadow-card p-6 space-y-5 mb-8">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Pop-up ativo</Label>
          <Switch checked={config.enabled} onCheckedChange={(v) => setConfig({ ...config, enabled: v })} />
        </div>

        <div>
          <Label className="text-sm font-medium">Título</Label>
          <Input value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} />
        </div>

        <div>
          <Label className="text-sm font-medium">Subtítulo</Label>
          <Input value={config.subtitle} onChange={(e) => setConfig({ ...config, subtitle: e.target.value })} />
        </div>

        <div>
          <Label className="text-sm font-medium">Link do WhatsApp</Label>
          <Input
            value={config.whatsapp_url}
            onChange={(e) => setConfig({ ...config, whatsapp_url: e.target.value })}
            placeholder="https://chat.whatsapp.com/..."
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Tempo de espera (segundos)</Label>
          <Input
            type="number"
            min={1}
            max={60}
            value={config.delay_seconds}
            onChange={(e) => setConfig({ ...config, delay_seconds: parseInt(e.target.value) || 5 })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Mostrar campo de e-mail</Label>
          <Switch checked={config.show_email_field} onCheckedChange={(v) => setConfig({ ...config, show_email_field: v })} />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Mostrar botão do WhatsApp</Label>
          <Switch checked={config.show_whatsapp_button} onCheckedChange={(v) => setConfig({ ...config, show_whatsapp_button: v })} />
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Salvando..." : saved ? "✅ Salvo!" : "Salvar Configurações"}
        </Button>
      </div>

      {/* Subscribers list */}
      <h2 className="font-display font-bold text-xl text-foreground mb-4">
        📧 E-mails Cadastrados ({subscribers.length})
      </h2>
      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>E-mail</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                  Nenhum e-mail cadastrado ainda.
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-sm font-medium">{s.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(s.created_at).toLocaleDateString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
