import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Spin } from "@arco-design/web-react"
import App from "./App.tsx"
import "./index.css"
import "uno.css"
import "@arco-design/web-react/dist/css/arco.css"
import "@anstec/earth/dist/style/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Spin />}>
      <App />
    </Suspense>
  </StrictMode>
)
