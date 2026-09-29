import api from "./api";
import type { Product } from "~/domain/Product";

export const getProductsByServer = async (
  serverId: number
): Promise<Array<Product>> => {
  try {
    const result = await api.get(`/products/${serverId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductsByServerCategory = async (
  serverId: number,
  categoryId: number
): Promise<Array<Product>> => {
  try {
    const result = await api.get(`/products/${serverId}/${categoryId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
