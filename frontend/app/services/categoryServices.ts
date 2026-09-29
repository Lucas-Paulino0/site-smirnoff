import type { Category } from "~/domain/Category";
import api from "./api";

export const getAllCategories = async (): Promise<Array<Category>> => {
  try {
    const result = await api.get(`/categories`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategory = async (
  internalName: string
): Promise<Category | undefined> => {
  try {
    const result = await api.get(`/categories/${internalName}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
