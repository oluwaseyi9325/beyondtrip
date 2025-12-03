import * as React from "react";
import { SVGProps } from "react";

const DownloadReceiptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <g fill="#336AEA" clipPath="url(#a)">
      <path d="M15.414 1H3v22h11.846A6.5 6.5 0 0 1 21 11.814V6.586L15.414 1ZM14.5 7.5V3L19 7.5h-4.5Z" />
      <path d="M20 13v7.11l2.508-2.48 1.406 1.422L19 23.91l-4.914-4.858 1.406-1.422L18 20.11V13h2Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default DownloadReceiptIcon;
