import * as React from 'react';
import { type SVGProps } from 'react';

export const LinkIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M11.7071 17.3641L10.2929 18.7783C8.34027 20.7309 5.17444 20.7309 3.22182 18.7783C1.2692 16.8256 1.2692 13.6598 3.22182 11.7072L4.63603 10.293M17.364 11.7072L18.7782 10.293C20.7308 8.34036 20.7308 5.17453 18.7782 3.22191C16.8255 1.26929 13.6597 1.26929 11.7071 3.22191L10.2929 4.63613M7.5 14.5001L14.5 7.50007" stroke="#FAFAFA" strokeWidth="2.03077" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
