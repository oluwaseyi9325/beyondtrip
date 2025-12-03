import * as React from "react";
import { SVGProps } from "react";

const CampaignIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.273 3A3.273 3.273 0 0 0 3 6.273v11.454A3.272 3.272 0 0 0 6.273 21h11.454A3.272 3.272 0 0 0 21 17.727V6.273A3.273 3.273 0 0 0 17.727 3H6.273Zm6.768 3.328a2.082 2.082 0 0 1 .762 2.845l-3.395 5.884a2.984 2.984 0 0 0-3.608-2.08l3.396-5.886a2.082 2.082 0 0 1 2.845-.763Zm-7.488 8.904c.043-.139.103-.274.18-.405l.014-.026a2.083 2.083 0 0 1 3.616 2.068l-.022.04c-.18.312-.439.573-.75.756a2.095 2.095 0 0 1-1.669.194 2.087 2.087 0 0 1-1.37-2.627Zm12.708-1.885a2.083 2.083 0 1 0-3.598-2.099l-2.083 3.57a2.083 2.083 0 0 0 3.598 2.1l2.083-3.571Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CampaignIcon;
