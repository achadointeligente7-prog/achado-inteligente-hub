import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }, []);

  return (
    <section className="py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center overflow-x-auto gap-4 pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="flex flex-col items-center gap-2 min-w-[100px] p-4 bg-card rounded-md shadow-card hover:shadow-card-hover transition-all text-center"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium text-foreground leading-tight">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
