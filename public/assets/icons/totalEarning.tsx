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
      fill="#27458F"
      d="m10.706 0 2.65 3.713 1.747-.595 1.595 4.665h.802v10H0v-10h.425v-.008l.54.005L10.705 0ZM6.58 7.783h8.357l-.865-2.527-1.268.406-6.224 2.121ZM5.282 6.464l6.426-2.189L10.372 2.4l-5.09 4.064ZM3.333 9.45H1.667v1.667A1.667 1.667 0 0 0 3.333 9.45Zm8.334 3.333a2.916 2.916 0 1 0-5.832 0 2.916 2.916 0 0 0 5.832 0Zm4.166 3.334V14.45a1.667 1.667 0 0 0-1.666 1.667h1.666ZM14.167 9.45a1.667 1.667 0 0 0 1.666 1.667V9.45h-1.666Zm-12.5 6.667h1.666a1.666 1.666 0 0 0-1.666-1.667v1.667Z"
    />
  </svg>
)
export default SvgComponent
