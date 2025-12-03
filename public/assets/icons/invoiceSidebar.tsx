import * as React from "react";
import { SVGProps } from "react";

const InvoiceSidebarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.21 3H3v14.25h1.895V4.9H17.21V3ZM21 22l-2.368-1.596L16.263 22l-2.368-1.596L11.526 22l-2.368-1.596L6.789 22V6.8H21V22ZM10.579 10.6v1.9h6.631v-1.9H10.58Zm4.737 3.8h-4.737v1.9h4.737v-1.9Z"
    />
  </svg>
);
export default InvoiceSidebarIcon;
