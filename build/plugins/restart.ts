import ViteRestart from "vite-plugin-restart"

export const restartPlugin = () => {
  return ViteRestart({
    restart: ["*.config.[jt]s", "**/config/*.[jt]s"],
  })
}
