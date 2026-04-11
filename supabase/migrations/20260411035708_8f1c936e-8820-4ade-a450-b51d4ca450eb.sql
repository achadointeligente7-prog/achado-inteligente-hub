
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL DEFAULT 'Anônimo',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
ON public.product_reviews
FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can insert reviews"
ON public.product_reviews
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admins can delete reviews"
ON public.product_reviews
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
