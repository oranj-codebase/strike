import * as React from 'react';
import { type SVGProps } from 'react';

export const CrossIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="2.80762"
        y="17.7782"
        width="24"
        height="2"
        transform="rotate(-45 2.80762 17.7782)"
        fill="#121212"
      />
      <rect
        x="4.22192"
        y="0.807617"
        width="24"
        height="2"
        transform="rotate(45 4.22192 0.807617)"
        fill="#121212"
      />
    </svg>
  );
};
