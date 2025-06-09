import { initMap, loadProvider } from "@/tools"
import { useEarthRecycle, useNavigation, type Earth } from "@anstec/earth"
import { useEffect, useRef, type FC } from "react"

const init = (earth: Earth) => {
  useNavigation(earth)
}

const Navigation: FC = () => {
  const earthRef = useRef<Earth | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    earthRef.current = initMap("rotate", containerRef.current!)
    loadProvider(earthRef.current)
    init(earthRef.current)
    return () => {
      useEarthRecycle("rotate")
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="w-full h-full"></div>
    </>
  )
}

export default Navigation
