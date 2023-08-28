export interface MetaProps {
  keepAlive?: boolean
  requiredAuth?: boolean
  title?: string
  key?: string
  iframeSrc?: string
}

export interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  meta?: MetaProps
  isLink?: string
}
