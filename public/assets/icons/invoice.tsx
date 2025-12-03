import * as React from "react";
import { SVGProps } from "react";

const InvoiceIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#27458F"
      d="M3 3v19l3-2 3 2 3-2 1.3.86c-.2-.58-.3-1.21-.3-1.86a6.004 6.004 0 0 1 8-5.66V3H3Zm14 4v2H7V7h10Zm-2 4v2H7v-2h8Zm.5 8 2.75 3L23 17.23l-1.16-1.41-3.59 3.59-1.59-1.59L15.5 19Z"
    />
  </svg>
);
export default InvoiceIcon;
