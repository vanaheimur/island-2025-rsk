// This file contains TypeScript declarations for various file types
// that might not have built-in type declarations

declare module '*.svg' {
  import * as React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

export interface SvgProps {
  title?: string
  titleId?: string
}
