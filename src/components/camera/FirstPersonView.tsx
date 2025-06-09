import { initMap, loadProvider } from "@/tools"
import { Earth, Geographic, ModelLayer, useEarthRecycle, ViewAngle } from "@anstec/earth"
import { Space, Switch } from "@arco-design/web-react"
import { DistanceDisplayCondition, HeadingPitchRoll } from "cesium"
import { useEffect, useRef, useState, type FC } from "react"

const FirstPersonView: FC = () => {
  const earthRef = useRef<Earth | null>(null)
  const modelLayerRef = useRef<ModelLayer | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const [turn, setTurn] = useState(true)

  const startRef = useRef<() => () => void>(() => {
    return modelLayerRef.current!.usePersonView("plane", { view: ViewAngle.FIRST })
  })
  const endRef = useRef<() => void | null>(null)

  const onSwitchChange = (value: boolean) => {
    setTurn(value)
    value ? (endRef.current = startRef.current()) : endRef.current?.()
  }

  useEffect(() => {
    earthRef.current = initMap("firstPersonView", containerRef.current!)
    loadProvider(earthRef.current)

    let stopAction: () => void
    const startPos = new Geographic(104, 31, 8000)
    const endPos = new Geographic(106, 32, 10000)
    modelLayerRef.current = new ModelLayer(earthRef.current)
    modelLayerRef.current
      .add({
        id: "plane",
        url: "/Cesium_Air.glb",
        position: startPos.toCartesian(),
        hpr: new HeadingPitchRoll(-Math.PI / 4, 0, 0),
        minimumPixelSize: 200,
        silhouetteSize: 0,
        distanceDisplayCondition: new DistanceDisplayCondition(0, 300000),
      })
      .then(() => {
        stopAction = modelLayerRef.current!.useAction({
          id: "plane",
          path: [startPos.toCartesian(), endPos.toCartesian()],
          split: 100,
          frequency: 50,
          loop: true,
        })
        endRef.current = startRef.current()
      })

    return () => {
      stopAction?.()
      useEarthRecycle("firstPersonView")
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="w-full h-full"></div>
      <Space className={["absolute", "w-12", "h-12", "top-1", "right-1"]}>
        <Switch checkedText="on" uncheckedText="off" checked={turn} onChange={onSwitchChange} />
      </Space>
    </>
  )
}

export default FirstPersonView
