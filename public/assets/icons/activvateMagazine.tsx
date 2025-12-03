import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      fill="#336AEA"
      d="M8 16.5c0 1.29.39 2.5 1.04 3.5H2c-1.11 0-2-.89-2-2V2a2 2 0 0 1 2-2h1v7l2.5-1.5L8 7V0h6a2 2 0 0 1 2 2v8.18c-.5-.11-1-.18-1.5-.18A6.5 6.5 0 0 0 8 16.5Zm10 0v-4l-1.17 1.17A3.999 3.999 0 0 0 14 12.5c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.68 0 3.12-1.03 3.71-2.5H16a2.5 2.5 0 1 1-.23-3.27L14 16.5h4Z"
    />
  </svg>
)
export default SvgComponent
