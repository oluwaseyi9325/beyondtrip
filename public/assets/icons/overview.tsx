import * as React from "react";
import { SVGProps } from "react";

const OverviewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3 19c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 1 17V7c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 3 5h10c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v10c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0 1 13 19H3Zm14 0V5h2v14h-2Zm4 0V5h2v14h-2Z"
    />
  </svg>
);
export default OverviewIcon;
