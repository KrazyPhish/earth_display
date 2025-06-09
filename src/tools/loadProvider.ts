import type { Earth } from "@anstec/earth"
import { ArcGisMapServerImageryProvider } from "cesium"

export const loadProvider = async (earth: Earth) => {
  const imageryLayer = await ArcGisMapServerImageryProvider.fromUrl(
    "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
  )
  earth.addImageryProvider(imageryLayer)
}
