import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, X, ImagePlus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  original_price: "",
  rating: 4.5,
  reviews: 0,
  image_url: "",
  category: "",
  tag: "" as string,
  affiliate_url: "#",
};

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const handleEdit = async (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      original_price: product.original_price || "",
      rating: product.rating,
      reviews: product.reviews,
      image_url: product.image_url,
      category: product.category,
      tag: product.tag || "",
      affiliate_url: product.affiliate_url,
    });

    // Load existing extra images
    const { data: imgs } = await supabase
      .from("product_images")
      .select("image_url")
      .eq("product_id", product.id)
      .order("sort_order", { ascending: true });
    setExtraImages(imgs?.map((i) => i.image_url) || []);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    await supabase.from("product_images").delete().eq("product_id", id);
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      original_price: form.original_price || null,
      tag: form.tag || null,
    };

    let productId = editingId;

    if (editingId) {
      await supabase.from("products").update(data).eq("id", editingId);
    } else {
      const { data: inserted } = await supabase.from("products").insert(data).select("id").single();
      productId = inserted?.id || null;
    }

    // Save extra images
    if (productId) {
      await supabase.from("product_images").delete().eq("product_id", productId);
      const validImages = extraImages.filter((url) => url.trim() !== "");
      if (validImages.length > 0) {
        await supabase.from("product_images").insert(
          validImages.map((url, i) => ({
            product_id: productId!,
            image_url: url.trim(),
            sort_order: i,
          }))
        );
      }
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyProduct);
    setExtraImages([]);
    fetchProducts();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyProduct);
    setExtraImages([]);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-foreground">Gerenciar Produtos</h1>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyProduct); setExtraImages([]); }}>
          <Plus className="h-4 w-4 mr-1" /> Novo Produto
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-card-hover w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-foreground">
                {editingId ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">Nome *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descrição</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Preço *</label>
                  <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="R$ 49,90" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Preço Original</label>
                  <Input value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} placeholder="R$ 99,90" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">URL da Imagem Principal *</label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." required />
              </div>

              {/* Extra images section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Imagens Adicionais</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setExtraImages([...extraImages, ""])}
                  >
                    <ImagePlus className="h-3.5 w-3.5 mr-1" /> Adicionar
                  </Button>
                </div>
                {extraImages.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={url}
                      onChange={(e) => {
                        const updated = [...extraImages];
                        updated[index] = e.target.value;
                        setExtraImages(updated);
                      }}
                      placeholder={`URL da imagem ${index + 2}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setExtraImages(extraImages.filter((_, i) => i !== index))}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {extraImages.length === 0 && (
                  <p className="text-xs text-muted-foreground">Nenhuma imagem adicional. Clique em "Adicionar" para inserir mais imagens na galeria.</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Link de Afiliado *</label>
                <Input value={form.affiliate_url} onChange={(e) => setForm({ ...form, affiliate_url: e.target.value })} placeholder="https://..." required />
              </div>
              <div className="grid grid-cols-2 gap-3">
              <div>
                  <label className="text-sm font-medium text-foreground">Categoria (grupo)</label>
                  <CategorySelect value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Tag</label>
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Nenhuma</option>
                    <option value="viral">🔥 Viral</option>
                    <option value="oferta">⚡ Oferta</option>
                    <option value="novo">✨ Novo</option>
                    <option value="top">🏆 Top</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Avaliação</label>
                  <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Nº Reviews</label>
                  <Input type="number" min="0" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? "Salvando..." : editingId ? "Salvar Alterações" : "Adicionar Produto"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="hidden md:table-cell">Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Tag</TableHead>
              <TableHead className="hidden lg:table-cell">Link Afiliado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Nenhum produto cadastrado. Clique em "Novo Produto" para começar.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded object-cover bg-muted" />
                      )}
                      <div>
                        <p className="font-medium text-foreground text-sm line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-foreground">{product.price}</p>
                    {product.original_price && (
                      <p className="text-xs text-muted-foreground line-through">{product.original_price}</p>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{product.tag || "—"}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <a href={product.affiliate_url} target="_blank" rel="noopener" className="text-xs text-secondary hover:underline truncate max-w-[150px] block">
                      {product.affiliate_url}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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