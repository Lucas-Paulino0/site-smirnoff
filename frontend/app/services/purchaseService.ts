import api from "./api";

// O comprador só é mandado para o checkout do Mercado Pago, nunca para um
// endereço qualquer vindo da resposta
const isMercadoPagoUrl = (url: unknown): url is string => {
  try {
    const { protocol, hostname } = new URL(String(url));
    return (
      protocol === "https:" &&
      /(^|\.)mercadopago\.com(\.[a-z]{2})?$|(^|\.)mercadolivre\.com(\.[a-z]{2})?$/.test(hostname)
    );
  } catch {
    return false;
  }
};

export const createPurchase = async (
  username: string,
  productIds: number[]
): Promise<string | undefined> => {
  try {
    const result = await api.post(`/purchases`, {
      username,
      productIds,
    });
    const initPoint = result.data.initPoint;
    return isMercadoPagoUrl(initPoint) ? initPoint : undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
