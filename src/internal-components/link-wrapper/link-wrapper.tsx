import React from 'react';
import { LinkWrapperProps } from './link-wrapper.types';

export const LinkWrapper: React.FC<LinkWrapperProps> = ({ link, children, ...anchorProps }) => {
	if (React.isValidElement(link)) {
		return React.cloneElement(link, {}, children);
	}

	return (
		<a {...anchorProps} href={link as string}>
			{children}
		</a>
	);
};
