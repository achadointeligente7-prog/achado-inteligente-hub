import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, X, Eye, EyeOff } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  sort_order: number;
}

const emptyPM = { name: "", icon: "💳" };

export function AdminPaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    const { data } = await supabase
      .from("payment_methods")
      .select("*")
      .order("sort_order");
    if (data) setMethods(data);
  };

  const toggleEnabled = async (id: string, enabled: boolean) => {
    await supabase.from("payment_methods").update({ enabled: !enabled }).eq("id", id);
    fetchMethods();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este método?")) return;
    await supabase.from("payment_methods").delete().eq("id", id);
    fetchMethods();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      await supabase.from("payment_methods").update(form).eq("id", editingId);
    } else {
      const maxOrder = methods.length > 0 ? Math.max(...methods.map((m) => m.sort_order)) : 0;
      await supabase.from("payment_methods").insert({ ...form, sort_order: maxOrder + 1 });
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyPM);
    fetchMethods();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">Formas de Pagamento</h1>
          <p className="text-sm text-muted-foreground mt-1">Informações exibidas no site. O pagamento é realizado na plataforma externa.</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyPM); }}>
          <Plus className="h-4 w-4 mr-1" /> Novo Método
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-card-hover w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-foreground">
                {editingId ? "Editar Método" : "Novo Método"}
              </h2>
              <button onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyPM); }} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">Nome *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Ex: Cartão de Crédito" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Ícone (emoji)</label>
                <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="💳" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? "Salvando..." : editingId ? "Salvar" : "Adicionar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyPM); }}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ícone</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="text-2xl">{m.icon}</TableCell>
                <TableCell className="font-medium text-foreground">{m.name}</TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleEnabled(m.id, m.enabled)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      m.enabled ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m.enabled ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {m.enabled ? "Ativo" : "Oculto"}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingId(m.id); setForm({ name: m.name, icon: m.icon }); setShowForm(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
