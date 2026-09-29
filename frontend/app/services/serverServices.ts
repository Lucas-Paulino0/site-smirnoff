import type { Server } from "~/domain/Server";
import api from "./api";

export const getAllServers = async (): Promise<Array<Server>> => {
  try {
    const result = await api.get(`/servers`);
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getServer = async (
  internalName: string
): Promise<Server | undefined> => {
  try {
    const result = await api.get(`/servers/${internalName}`);
    return result.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
