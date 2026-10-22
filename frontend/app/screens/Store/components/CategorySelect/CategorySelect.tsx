import { useEffect, useState } from "react";
import type { Category } from "~/domain/Category";
import { getAllCategories } from "~/services/categoryServices";

type CategorySelectProps = {
  setCategory: (category: Category | undefined) => void;
};

export default function CategorySelect({ setCategory }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>();
  const [selected, setSelected] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories: Category[] = await getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  // Restaura a categoria do link (#Nome) quando as categorias chegam
  useEffect(() => {
    const fromHash = decodeURIComponent(window.location.hash.replace("#", ""));
    const category = categories?.find((category) => category.name === fromHash);
    setSelected(category);
  }, [categories]);

  useEffect(() => {
    if (selected) {
      window.history.replaceState(null, "", `#${selected.name}`);
    } else if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    setCategory(selected);
  }, [selected]);

  const item = (label: string, category: Category | undefined) => {
    const active = selected?.id === category?.id;
    return (
      <button
        key={category?.id ?? "all"}
        type="button"
        className={`categories__item${active ? " categories__item--active" : ""}`}
        aria-pressed={active}
        onClick={() => setSelected(category)}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className="categories" aria-label="Categorias">
      {item("Todos", undefined)}
      {categories?.map((category) => item(category.name, category))}
    </nav>
  );
}
