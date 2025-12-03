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
      d="M0 .993A1 1 0 0 1 .992 0h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H.992A.993.993 0 0 1 0 17.007V.993ZM4 12v2h12v-2H4Zm0-8v6h6V4H4Zm8 0v2h4V4h-4Zm0 4v2h4V8h-4ZM6 6h2v2H6V6Z"
    />
  </svg>
)
export default SvgComponent
