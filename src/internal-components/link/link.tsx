'use client';
import { LinkProps } from './link.types';
import { useLinkComponent } from '@/foundation';

export const Link = ({ children, ...anchorProps }: LinkProps) => {
	const LinkComponent = useLinkComponent();

	return <LinkComponent {...anchorProps}>{children}</LinkComponent>;
};
