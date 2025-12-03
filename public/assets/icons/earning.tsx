import * as React from "react"
import { SVGProps } from "react"
const EarningIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 1.8V3H1.8A1.8 1.8 0 0 0 0 4.8v8.4A1.8 1.8 0 0 0 1.8 15h16.4a1.8 1.8 0 0 0 1.8-1.8V12h1.2c.992 0 1.8-.808 1.8-1.8V1.8c0-.992-.808-1.8-1.8-1.8H4.8C3.808 0 3 .808 3 1.8ZM5 2v1h13.2A1.8 1.8 0 0 1 20 4.8V10h1V2H5Zm3 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default EarningIcon
