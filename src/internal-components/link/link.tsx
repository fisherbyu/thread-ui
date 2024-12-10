import React from 'react';
import type { LinkProps } from './link.types';

let NextLink: any;

// Check for Next.js Link at module level
if (typeof window !== 'undefined') {
	try {
		NextLink = require('next/link').default;
	} catch {
		NextLink = null;
	}
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, prefetch, ...props }, ref) => {
	// If Next.js Link is available and href is internal
	if (NextLink && !href.startsWith('http') && !href.startsWith('//')) {
		return (
			<NextLink href={href} ref={ref} prefetch={prefetch} {...props}>
				{children}
			</NextLink>
		);
	}

	// Fallback to regular anchor for external links or non-Next.js projects
	return (
		<a
			href={href}
			ref={ref}
			{...props}
			// Add security attributes for external links
			{...(href.startsWith('http') || href.startsWith('//') ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
		>
			{children}
		</a>
	);
});

Link.displayName = 'Link';
