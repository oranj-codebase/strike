import * as React from 'react';
import { type SVGProps } from 'react';

export const TwitterIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3.75 1.875H1.5625L4.14402 5.31703L1.70311 8.12497H2.53124L4.52759 5.82844L6.25 8.125H8.4375L5.74741 4.53822L8.06253 1.875H7.23441L5.36384 4.02681L3.75 1.875ZM6.5625 7.5L2.8125 2.5H3.4375L7.1875 7.5H6.5625Z" fill="#E4E4E7" />
        </svg>
    );
};
