'use client';
import React from 'react';
import { LinkWrapperProps } from './link.types';
import { useLinkComponent } from '@/foundation';

export const Link: React.FC<LinkWrapperProps> = ({ children, ...anchorProps }) => {
	const LinkComponent = useLinkComponent();

	return <LinkComponent {...anchorProps}>{children}</LinkComponent>;
};
