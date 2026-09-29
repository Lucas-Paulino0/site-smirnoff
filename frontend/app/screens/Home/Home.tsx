import ServerList from "./components/ServerList/ServerList";
import { useEffect, useState } from "react";
import type { Server } from "~/domain/Server";
import { getAllServers } from "~/services/serverServices";
import PageContainer from "~/ui/PageContainer/PageContainer";

export default function Home() {
  const [servers, setServers] = useState<Server[]>([]);
  const [video, setVideo] = useState("home_video.mp4");

  useEffect(() => {
    const fetchServers = async () => {
      const fetchedServers: Server[] = await getAllServers();
      setServers(fetchedServers);
    };

    fetchServers();
  }, []);

  return (
    <PageContainer title="Servidores" video={video}>
      <ServerList servers={servers} setVideo={setVideo} />
    </PageContainer>
  );
}
