import { initMap, loadProvider } from "@/tools"
import { Earth, Geographic, useEarthRecycle, Utils } from "@anstec/earth"
import { Typography } from "@arco-design/web-react"
import { Cartesian3, JulianDate, ScreenSpaceEventHandler, ScreenSpaceEventType } from "cesium"
import { useEffect, useRef, useState, type FC } from "react"

const Text = Typography.Text

const registerCoordinate = (earth: Earth, callback: (pos: Cartesian3 | undefined) => void) => {
  const handler = new ScreenSpaceEventHandler(earth.scene.canvas)
  handler.setInputAction((e: ScreenSpaceEventHandler.MotionEvent) => {
    const coor = earth.coordinate.screenToCartesian(e.endPosition)
    callback(coor)
  }, ScreenSpaceEventType.MOUSE_MOVE)
  return () => {
    handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
    handler.destroy()
  }
}

const registerTimeTick = (earth: Earth, callback: (time: string) => void) => {
  const cb = (clock: any) => {
    callback(JulianDate.toDate(clock.currentTime).toLocaleString())
  }
  earth.clock.onTick.addEventListener(cb)
  return () => {
    earth.clock.onTick.removeEventListener(cb)
  }
}

const Coordinate: FC = () => {
  const earthRef = useRef<Earth | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [coord, setCoord] = useState({ longitude: "", latitude: "" })
  const [time, setTime] = useState("")

  const refreshCoord = (pos: Cartesian3 | undefined) => {
    if (pos) {
      const { longitude, latitude } = Geographic.fromCartesian(pos)
      setCoord({ longitude: Utils.formatGeoLongitude(longitude), latitude: Utils.formatGeoLatitude(latitude) })
    }
  }

  useEffect(() => {
    earthRef.current = initMap("coordinate", containerRef.current!)
    loadProvider(earthRef.current)
    const disposeCoor = registerCoordinate(earthRef.current, refreshCoord)
    const disposeTick = registerTimeTick(earthRef.current, setTime)

    return () => {
      disposeCoor()
      disposeTick()
      useEarthRecycle("coordinate")
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="w-full h-full"></div>
      <div className="absolute right-2 top-2 w-40 h-16">
        <div className="w-full">
          <Text type="error">时 间: </Text>
          {time}
        </div>
        <div className="w-full">
          <Text type="error">经 度: </Text>
          {coord.longitude}
        </div>
        <div className="w-full">
          <Text type="error">纬 度: </Text>
          {coord.latitude}
        </div>
      </div>
    </>
  )
}

export default Coordinate
