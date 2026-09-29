import type { ServerStatus } from "~/domain/ServerStatus";
import api from "./api";

export const getServerStatus = async (): Promise<ServerStatus | undefined> => {
  try {
    const result = await api.get(`/status`);
    return result.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
