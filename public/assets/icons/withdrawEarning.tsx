// import * as React from "react";
// import { SVGProps } from "react";


// const WithdrawEarnings = (props: SVGProps<SVGSVGElement>) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={21}
//     height={20}
//     fill="none"
//     {...props}
//   >
//     <mask
//       id="a"
//       width={21}
//       height={20}
//       x={0}
//       y={0}
//       maskUnits="userSpaceOnUse"
//       style={{
//         maskType: "luminance",
//       }}
//     >
//       <path
//         fill="#fff"
//         stroke="#fff"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M1 2a1 1 0 0 1 1-1h6l2.5 3H19a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2Z"
//       />
//       <path
//         stroke="#000"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 9.5 6.5 12 9 14.5"
//       />
//       <path
//         stroke="#000"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M6.5 12h8V9"
//       />
//     </mask>
//     <g mask="url(#a)">
//       <path fill="#336AEA" d="M-1.5-2h24v24h-24V-2Z" />
//     </g>
//   </svg>
// );
// export default WithdrawEarnings;



import * as React from "react"
import { SVGProps } from "react"
const WithdrawEarnings = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={22}
      height={20}
      x={1}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.5 4a1 1 0 0 1 1-1h6L12 6h8.5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V4Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.5 11.5 8 14l2.5 2.5"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 14h8v-3"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#336AEA" d="M0 0h24v24H0V0Z" />
    </g>
  </svg>
)
export default WithdrawEarnings