import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-8">
          Explore por Categoria
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 bg-card rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="font-display font-semibold text-sm text-foreground text-center">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
