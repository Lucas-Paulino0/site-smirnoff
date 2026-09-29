import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Category } from "~/domain/Category";
import type { Product } from "~/domain/Product";
import type { Server } from "~/domain/Server";
import {
  getProductsByServer,
  getProductsByServerCategory,
} from "~/services/productServices";
import ProductCard from "../ProductCard/ProductCard";
import SkeletonCard from "../ProductCard/Skeleton/SkeletonCard";

type ProductListProps = {
  server?: Server;
  category?: Category;
};

export default function ProductList({ server, category }: ProductListProps) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (server) {
        setProducts([]);
        setLoading(true);
        if (category) {
          const fetchedProducts: Product[] = await getProductsByServerCategory(
            server.id,
            category.id
          );
          setProducts(fetchedProducts);
        } else {
          const fetchedProducts: Product[] = await getProductsByServer(
            server.id
          );
          setProducts(fetchedProducts);
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, server]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        padding: 2,
      }}
    >
      {!loading ? (
        products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <>
            <Typography
              color="primary"
              sx={{
                fontSize: 28,
                textAlign: "center",
                width: "100%",
                marginTop: 2,
              }}
            >
              Nenhum produto encontrado
            </Typography>
          </>
        )
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </Grid>
  );
}
