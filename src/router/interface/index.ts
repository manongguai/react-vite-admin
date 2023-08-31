export interface MetaProps {
  keepAlive?: boolean
  requiredAuth?: boolean
  title?: string
  key?: string
  iframeSrc?: string
  code: string
}

export interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  path?: string
  meta?: MetaProps
  loader?: any
  id?: string
}
