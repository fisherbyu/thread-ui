import { LinkProps } from './link.types';

export const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
	let NextLink;
	try {
		// Dynamically import Next.js Link if available
		NextLink = require('next/link').default;
	} catch (error) {
		NextLink = null;
	}

	if (NextLink) {
		return (
			<NextLink href={href} {...props}>
				{children}
			</NextLink>
		);
	}

	// Fallback for React projects
	return (
		<a href={href} {...props}>
			{children}
		</a>
	);
};
