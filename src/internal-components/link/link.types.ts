// link.types.ts
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
	href: string;
	children: ReactNode;
	prefetch?: boolean; // Next.js specific prop
}
