import * as React from "react";
import { SVGProps } from "react";

const EarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#27458F"
      d="M11.25 13.333a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
    />
    <path
      fill="#27458F"
      d="m11.956.55 2.65 3.713 1.747-.595 1.595 4.665h.802v10H1.25v-10h.425v-.008l.54.005 9.74-7.78ZM7.83 8.333h8.357l-.865-2.527-1.268.406-6.224 2.121ZM6.532 7.014l6.426-2.189-1.336-1.875-5.09 4.064ZM4.583 10H2.917v1.667A1.667 1.667 0 0 0 4.583 10Zm8.334 3.333a2.917 2.917 0 1 0-5.834 0 2.917 2.917 0 0 0 5.834 0Zm4.166 3.334V15a1.667 1.667 0 0 0-1.666 1.667h1.666ZM15.417 10a1.667 1.667 0 0 0 1.666 1.667V10h-1.666Zm-12.5 6.667h1.666A1.667 1.667 0 0 0 2.917 15v1.667Z"
    />
  </svg>
);
export default EarningIcon;
