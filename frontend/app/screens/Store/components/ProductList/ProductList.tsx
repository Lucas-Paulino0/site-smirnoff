import { useEffect, useState } from "react";
import type { Category } from "~/domain/Category";
import type { Product } from "~/domain/Product";
import {
  getProducts,
  getProductsByCategory,
} from "~/services/productServices";
import ProductCard from "../ProductCard/ProductCard";

type ProductListProps = {
  category?: Category;
};

export default function ProductList({ category }: ProductListProps) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      setProducts([]);
      setLoading(true);
      const fetchedProducts = category
        ? await getProductsByCategory(category.id)
        : await getProducts();
      if (!active) return;
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, [category]);

  return (
    <div className="products">
      {loading ? (
        <>
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="frame products__empty">
          <h2 className="title">Nenhum produto por aqui</h2>
          <p className="muted">
            Os itens da loja ainda estão sendo preparados. Volte em breve!
          </p>
        </div>
      )}
    </div>
  );
}
