'use client';
import React from 'react';
import { LinkWrapperProps } from './link-wrapper.types';
import { useLinkComponent } from '@/foundation';

export const LinkWrapper: React.FC<LinkWrapperProps> = ({ children, ...anchorProps }) => {
	const Link = useLinkComponent();

	return <Link {...anchorProps}>{children}</Link>;
};
