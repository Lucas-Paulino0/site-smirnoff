import { Grid } from "@mui/material";
import ServerCard from "../ServerCard/ServerCard";
import type { Server } from "~/domain/Server";
import SkeletonCard from "../ServerCard/Skeleton/SkeletonCard";

type ServerListProps = {
  servers: Server[];
  setVideo: (video: string) => void;
};

export default function ServerList({ servers, setVideo }: ServerListProps) {
  const handleEnter = (server: Server) => {
    setVideo(server.video);
  };

  const handleLeave = () => {
    setVideo("home_video.mp4");
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 1, padding: 2 }}>
      {servers.length > 0 ? (
        servers.map((server) => (
          <>
            <ServerCard
              server={server}
              onMouseEnter={() => handleEnter(server)}
              onMouseLeave={() => handleLeave()}
            />
          </>
        ))
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </Grid>
  );
}
