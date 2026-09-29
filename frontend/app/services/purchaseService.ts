import api from "./api";

export const createPurchase = async (
  username: string,
  productIds: number[]
): Promise<string | undefined> => {
  try {
    const result = await api.post(`/purchases`, {
      username,
      productIds,
    });
    return result.data.initPoint;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
