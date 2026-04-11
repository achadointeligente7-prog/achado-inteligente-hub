import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      reviewer_name: name.trim() || "Anônimo",
      rating,
      comment: comment.trim() || null,
    });
    if (error) {
      toast.error("Erro ao enviar avaliação");
    } else {
      toast.success("Avaliação enviada com sucesso!");
      setName("");
      setRating(5);
      setComment("");
      setShowForm(false);
      fetchReviews();
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-card rounded-md p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-lg text-foreground">
          ⭐ Avaliações {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        {avgRating && (
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground text-lg">{avgRating}</span>
            <Star className="h-4 w-4 fill-accent text-accent" />
          </div>
        )}
      </div>

      {!showForm ? (
        <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
          Escrever uma avaliação
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 border border-border rounded-md p-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Seu nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anônimo"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Nota</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Comentário</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte sua experiência..."
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? "Enviando..." : "Enviar avaliação"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando avaliações...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma avaliação ainda. Seja o primeiro!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="border-t border-border pt-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{review.reviewer_name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= review.rating ? "fill-accent text-accent" : "text-border"
                    }`}
                  />
                ))}
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
