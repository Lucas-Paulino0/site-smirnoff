import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.PUBLIC_API_URL": JSON.stringify(env.PUBLIC_API_URL),
      "process.env.PUBLIC_SERVER_IP": JSON.stringify(env.PUBLIC_SERVER_IP),
      "process.env.PUBLIC_DISCORD_URL": JSON.stringify(env.PUBLIC_DISCORD_URL),
    },
    plugins: [reactRouter(), tsconfigPaths()],
  };
});
