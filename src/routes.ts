import { IconCamera, type IconProps } from "@arco-design/web-react/icon"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import { type RouteObject } from "react-router-dom"

type OmitChildrenRoute = Omit<RouteObject, "children">

type ExternalRouteObject = OmitChildrenRoute & {
  parentName?: string
  navName?: string
  keyName?: string
  children?: ExternalRouteObject[]
}

export type RootMenu = {
  title: string
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<unknown>>
  key: string
}

export const parents: { [key: string]: RootMenu } = {
  camera: {
    title: "相 机 控 制",
    icon: IconCamera,
    key: "0",
  },
}

export const routes: ExternalRouteObject[] = [
  {
    path: "/",
    lazy: async () => ({ Component: (await import("./Nav")).default }),
    children: [
      {
        parentName: parents.camera.title,
        navName: "绕 点 旋 转",
        keyName: "0",
        path: "rotate",
        lazy: async () => ({
          Component: (await import("./components/camera/Rotate")).default,
        }),
      },
      {
        parentName: parents.camera.title,
        navName: "控 制 摇 杆",
        keyName: "1",
        path: "navigation",
        lazy: async () => ({
          Component: (await import("./components/camera/Navigation")).default,
        }),
      },
      {
        parentName: parents.camera.title,
        navName: "实 时 坐 标",
        keyName: "2",
        path: "coordinate",
        lazy: async () => ({
          Component: (await import("./components/camera/Coordinate")).default,
        }),
      },
      {
        parentName: parents.camera.title,
        navName: "第 一 人 称 视 角",
        keyName: "3",
        path: "firstPersonView",
        lazy: async () => ({
          Component: (await import("./components/camera/FirstPersonView")).default,
        }),
      },
    ],
  },
]
