import { LinkComponent, Prettify, ThemeConfig } from '@/types';
import { ElementType, ReactNode } from 'react';

export type ThreadProviderProps = Prettify<{
	linkComponent?: LinkComponent;
	theme?: ThemeConfig;
	children: ReactNode;
}>;

export type ThreadFoundation = {
	LinkComponent: LinkComponent | 'a';
};
