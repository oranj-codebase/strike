import * as React from 'react';
import { type SVGProps } from 'react';

export const TelegramIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.99328 2.10439C9.05562 1.70166 8.6727 1.38378 8.31461 1.541L1.18241 4.67242C0.925614 4.78517 0.944398 5.17413 1.21073 5.25894L2.68157 5.72734C2.96229 5.81673 3.26626 5.77051 3.51139 5.60115L6.82749 3.31014C6.92748 3.24105 7.03648 3.38323 6.95105 3.47132L4.56406 5.93232C4.3325 6.17106 4.37847 6.57558 4.65698 6.75024L7.32948 8.42615C7.62923 8.61412 8.01484 8.42528 8.07091 8.06307L8.99328 2.10439Z"
        fill="#E4E4E7"
      />
    </svg>
  );
};
