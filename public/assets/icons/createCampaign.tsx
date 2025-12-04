import * as React from "react";
import { SVGProps } from "react";
const CreateCampaignIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#336AEA"
      fillRule="evenodd"
      d="M8 0v6.5a1.5 1.5 0 0 0 1.356 1.493L9.5 8H16v10a2 2 0 0 1-1.85 1.995L14 20H2a2 2 0 0 1-1.995-1.85L0 18V2A2 2 0 0 1 1.85.005L2 0h6Zm0 9.5a1 1 0 0 0-.993.883L7 10.5V12H5.5a1 1 0 0 0-.117 1.993L5.5 14H7v1.5a1 1 0 0 0 1.993.117L9 15.5V14h1.5a1 1 0 0 0 .117-1.993L10.5 12H9v-1.5a1 1 0 0 0-1-1Zm2-9.457a2 2 0 0 1 .877.43L11 .586 15.414 5a2 2 0 0 1 .502.84l.04.16H10V.043Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CreateCampaignIcon;
