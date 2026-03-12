
-- Categories table (admin-managed)
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '📦',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert default categories
INSERT INTO public.categories (name, slug, icon, sort_order) VALUES
  ('Achados da Shopee', 'shopee', '🛍️', 1),
  ('Produtos Virais', 'virais', '🔥', 2),
  ('Gadgets Úteis', 'gadgets', '⚡', 3),
  ('Barato até R$50', 'barato', '💰', 4),
  ('Casa Inteligente', 'casa', '🏠', 5),
  ('Cozinha Organizada', 'cozinha', '🍳', 6),
  ('Tecnologia Útil', 'tecnologia', '💻', 7),
  ('Ofertas do Dia', 'ofertas', '⏰', 8);

-- Product clicks tracking
CREATE TABLE public.product_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT
);

ALTER TABLE public.product_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert clicks"
  ON public.product_clicks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view clicks"
  ON public.product_clicks FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Site visits tracking
CREATE TABLE public.site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  page TEXT NOT NULL DEFAULT '/',
  user_agent TEXT,
  referrer TEXT
);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visits"
  ON public.site_visits FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view visits"
  ON public.site_visits FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Payment methods display config
CREATE TABLE public.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '💳',
  enabled BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payment methods are viewable by everyone"
  ON public.payment_methods FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage payment methods"
  ON public.payment_methods FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert default payment methods
INSERT INTO public.payment_methods (name, icon, sort_order) VALUES
  ('Cartão de Crédito', '💳', 1),
  ('Pix', '📱', 2),
  ('Boleto Bancário', '📄', 3);
