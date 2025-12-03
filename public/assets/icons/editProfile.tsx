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
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M7 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2.8 1h-.522a5.445 5.445 0 0 1-4.556 0H4.2A4.201 4.201 0 0 0 0 15.2v1.3A1.5 1.5 0 0 0 1.5 18h8.59a1.5 1.5 0 0 1-.08-.666l.212-1.903.037-.347.247-.246 2.416-2.416A4.157 4.157 0 0 0 9.8 11Zm1.416 4.54-.213 1.907a.498.498 0 0 0 .55.55l1.903-.213 4.31-4.309-2.241-2.24-4.31 4.306Zm8.565-5.137L18.597 9.22a.749.749 0 0 0-1.056 0L16.359 10.4l-.128.128 2.244 2.24 1.306-1.306a.752.752 0 0 0 0-1.059Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 2h20v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
