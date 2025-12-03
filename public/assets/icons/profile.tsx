import * as React from "react";
import { SVGProps } from "react";
const ProfileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm1 11h-2a6.001 6.001 0 0 0-5.518 3.64A7.99 7.99 0 0 0 12 20a7.99 7.99 0 0 0 6.518-3.36A6.002 6.002 0 0 0 13 13Zm-1-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ProfileIcon;
