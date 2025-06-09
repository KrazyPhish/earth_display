import { useEarth } from "@anstec/earth"
import { buildModuleUrl, ImageryLayer, TileMapServiceImageryProvider } from "cesium"

export const initMap = (name: string, ref: HTMLDivElement) => {
  return useEarth(
    name,
    ref,
    {
      baseLayer: ImageryLayer.fromProviderAsync(
        TileMapServiceImageryProvider.fromUrl(buildModuleUrl("Assets/Textures/NaturalEarthII")),
        {}
      ),
    },
    {
      adaptiveCameraController: false,
    }
  )
}
