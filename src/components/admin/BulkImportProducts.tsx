import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, Download, X, CheckCircle, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";

const HEADERS = [
  "nome",
  "preco",
  "preco_original",
  "descricao",
  "imagem_principal",
  "imagens_adicionais",
  "categoria",
  "tag",
  "avaliacao",
  "num_reviews",
  "link_afiliado",
];

const TEMPLATE_ROW = {
  nome: "Produto Exemplo",
  preco: "R$ 49,90",
  preco_original: "R$ 99,90",
  descricao: "Descrição do produto aqui",
  imagem_principal: "https://exemplo.com/imagem.jpg",
  imagens_adicionais: "https://img2.jpg|https://img3.jpg",
  categoria: "eletronicos",
  tag: "viral",
  avaliacao: 4.5,
  num_reviews: 120,
  link_afiliado: "https://afiliado.com/link",
};

function downloadTemplate() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([TEMPLATE_ROW], { header: HEADERS });

  // Set column widths
  ws["!cols"] = [
    { wch: 30 }, // nome
    { wch: 14 }, // preco
    { wch: 14 }, // preco_original
    { wch: 40 }, // descricao
    { wch: 40 }, // imagem_principal
    { wch: 50 }, // imagens_adicionais
    { wch: 15 }, // categoria
    { wch: 10 }, // tag
    { wch: 10 }, // avaliacao
    { wch: 12 }, // num_reviews
    { wch: 40 }, // link_afiliado
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Produtos");
  XLSX.writeFile(wb, "modelo_importacao_produtos.xlsx");
}

interface ImportResult {
  success: number;
  errors: string[];
}

interface Props {
  onComplete: () => void;
}

export function BulkImportProducts({ onComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setResult(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

      if (!rows.length) {
        setResult({ success: 0, errors: ["Arquivo vazio ou inválido."] });
        setImporting(false);
        return;
      }

      const errors: string[] = [];
      let success = 0;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2;

        const get = (col: string) => String(row[col] ?? "").trim();

        const nome = get("nome");
        const preco = get("preco");
        const linkAfiliado = get("link_afiliado");

        if (!nome || !preco) {
          errors.push(`Linha ${rowNum}: nome e preço são obrigatórios.`);
          continue;
        }

        const reviewsRaw = get("num_reviews").replace(/\./g, "").replace(/,/g, "");

        const productData = {
          name: nome,
          price: preco,
          original_price: get("preco_original") || null,
          description: get("descricao") || "",
          image_url: get("imagem_principal") || "",
          category: get("categoria") || "",
          tag: get("tag") || null,
          rating: parseFloat(get("avaliacao")) || 4.5,
          reviews: parseInt(reviewsRaw) || 0,
          affiliate_url: linkAfiliado || "#",
        };

        const { data: inserted, error } = await supabase
          .from("products")
          .insert(productData)
          .select("id")
          .single();

        if (error) {
          errors.push(`Linha ${rowNum}: ${error.message}`);
          continue;
        }

        const extraImgs = get("imagens_adicionais");
        if (extraImgs && inserted) {
          const urls = extraImgs.split("|").map((u) => u.trim()).filter(Boolean);
          if (urls.length > 0) {
            await supabase.from("product_images").insert(
              urls.map((url, idx) => ({
                product_id: inserted.id,
                image_url: url,
                sort_order: idx,
              }))
            );
          }
        }

        success++;
      }

      setResult({ success, errors });
      if (success > 0) onComplete();
    } catch (err) {
      setResult({ success: 0, errors: ["Erro ao ler o arquivo. Verifique se é um arquivo .xlsx válido."] });
    }

    setImporting(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  if (!open) {
    return (
      <Button variant="outline" onClick={() => { setOpen(true); setResult(null); }}>
        <Upload className="h-4 w-4 mr-1" /> Importar em Massa
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-card-hover w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-foreground">Importar Produtos em Massa</h2>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Faça o download da planilha modelo (.xlsx), preencha com seus produtos e envie o arquivo.
            Para múltiplas imagens adicionais, separe os links com <strong>|</strong>.
          </p>

          <Button variant="outline" className="w-full" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-1" /> Baixar Planilha Modelo (.xlsx)
          </Button>

          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFile}
              className="hidden"
              id="xlsx-upload"
            />
            <label
              htmlFor="xlsx-upload"
              className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Upload className="h-8 w-8" />
              <span className="text-sm font-medium">
                {importing ? "Importando..." : "Clique para enviar o arquivo .xlsx"}
              </span>
            </label>
          </div>

          {result && (
            <div className="space-y-2">
              {result.success > 0 && (
                <div className="flex items-center gap-2 text-sm text-secondary bg-secondary/10 rounded-md p-3">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>{result.success} produto(s) importado(s) com sucesso!</span>
                </div>
              )}
              {result.errors.length > 0 && (
                <div className="bg-destructive/10 rounded-md p-3 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{result.errors.length} erro(s):</span>
                  </div>
                  <ul className="text-xs text-destructive space-y-0.5 max-h-32 overflow-y-auto">
                    {result.errors.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
          Fechar
        </Button>
      </div>
    </div>
  );
}
