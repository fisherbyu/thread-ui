import { Prettify, ThemeConfig } from '@/types';
import { ElementType, ReactNode } from 'react';

export type ThreadProviderProps = Prettify<{
	linkComponent?: ThreadFoundation['LinkComponent'];
	theme?: ThemeConfig;
	children: ReactNode;
}>;

export type ThreadFoundation = {
	LinkComponent: ElementType;
};
