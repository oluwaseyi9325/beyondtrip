import * as React from "react";
import { SVGProps } from "react";

const ContactSupportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill="#27458F"
      d="M3.75 6.75a5.25 5.25 0 1 1 10.5 0 .75.75 0 1 0 1.5 0 6.75 6.75 0 1 0-8.12 6.61 1.5 1.5 0 1 0 .162-1.5A5.25 5.25 0 0 1 3.75 6.75Zm.75 0a4.5 4.5 0 1 1 5.935 4.266 2.25 2.25 0 0 0-2.87 0A4.5 4.5 0 0 1 4.5 6.75ZM9 15a2.25 2.25 0 0 0 2.123-3h4.252A2.625 2.625 0 0 1 18 14.623V15c0 1.795-1.142 3.313-2.764 4.345C13.606 20.382 11.398 21 9 21c-2.399 0-4.605-.617-6.236-1.655C1.142 18.312 0 16.794 0 15v-.375A2.625 2.625 0 0 1 2.625 12h1.02a7.5 7.5 0 0 0 3.496 2.018A2.248 2.248 0 0 0 9 14.999Z"
    />
  </svg>
);
export default ContactSupportIcon;
