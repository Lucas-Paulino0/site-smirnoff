import axios from "axios";
import api from "./api";

// UUID da conta original, null se o nick não tem conta original e undefined
// se a API não respondeu
export const getPlayerUuid = async (
  nick: string
): Promise<string | null | undefined> => {
  try {
    const result = await api.get(`/players/${encodeURIComponent(nick)}`);
    return result.data.uuid;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    console.log(error);
    return undefined;
  }
};
