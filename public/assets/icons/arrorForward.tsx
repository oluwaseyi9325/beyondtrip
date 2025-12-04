import * as React from "react";
import { SVGProps } from "react";

const ArrowForwardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#336AEA"
      d="m0 12.153 1.18 1.18 6.667-6.666L1.18 0 0 1.18l5.487 5.487L0 12.153Z"
    />
  </svg>
);
export default ArrowForwardIcon;
