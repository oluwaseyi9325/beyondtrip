import * as React from "react";
import { SVGProps } from "react";
const TotalQuota = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#27458F"
        d="M20 4.871 10 .703 0 4.871 10 9.04l10-4.168Zm-10 5.832-5.66-2.64L0 9.87l10 4.168 10-4.168-4.34-1.809L10 10.704Zm0 5-5.453-2.726L0 14.87l10 4.168 10-4.168-4.547-1.894L10 15.703Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default TotalQuota;
