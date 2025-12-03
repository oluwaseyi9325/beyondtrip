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
      fill="currentColor"
      fillRule="evenodd"
      d="M10 0a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Zm1 11H9a6.001 6.001 0 0 0-5.518 3.64A7.99 7.99 0 0 0 10 18a7.99 7.99 0 0 0 6.518-3.36A6.002 6.002 0 0 0 11 11Zm-1-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
