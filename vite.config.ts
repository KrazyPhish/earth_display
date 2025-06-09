import { fileURLToPath, URL } from "url"
import { type ConfigEnv, defineConfig, loadEnv, type UserConfig } from "vite"
import { wrapperEnv } from "./build/utils"
import { createVitePlugins } from "./build/plugins"

// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build"
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return defineConfig({
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 65535,
      proxy: {
        "/api": {
          target: viteEnv.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  })
}
