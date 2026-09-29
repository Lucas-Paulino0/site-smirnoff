export type Server = {
  id: number;
  internalName: string;
  name: string;
  ip: string;
  image: string;
  video: string;
  status?: string;
  players?: number;
  maxPlayers?: number;
};
