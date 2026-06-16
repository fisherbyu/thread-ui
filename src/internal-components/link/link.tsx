'use client';
import React from 'react';
import { LinkProps } from './link.types';
import { useLinkComponent } from '@/foundation';

export const Link: React.FC<LinkProps> = ({ children, ...anchorProps }) => {
	const LinkComponent = useLinkComponent();

	return <LinkComponent {...anchorProps}>{children}</LinkComponent>;
};
