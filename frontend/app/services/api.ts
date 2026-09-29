import axios from "axios";

const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
});

// Imagens e arquivos servidos pela pasta /files do backend
export const fileUrl = (name: string) =>
  `${process.env.PUBLIC_API_URL}/files/${name}`;

const priceFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatPrice = (value: number) => priceFormat.format(value);

export default api;
