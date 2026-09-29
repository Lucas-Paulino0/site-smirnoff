import api from "./api";
import type { Product } from "~/domain/Product";

export const getProducts = async (): Promise<Array<Product>> => {
  try {
    const result = await api.get(`/products`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductsByCategory = async (
  categoryId: number
): Promise<Array<Product>> => {
  try {
    const result = await api.get(`/products/category/${categoryId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
