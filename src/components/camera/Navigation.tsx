import { initMap, loadProvider } from "@/tools"
import { useEarthRecycle, useNavigation, type Earth } from "@anstec/earth"
import { useEffect, useRef, type FC } from "react"

const init = (earth: Earth) => {
  useNavigation(earth)
}

const Navigation: FC = () => {
  let earth: Earth
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    earth = initMap("rotate", containerRef.current!)
    loadProvider(earth)
    init(earth)
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
