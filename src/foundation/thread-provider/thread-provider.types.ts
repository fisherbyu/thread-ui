import { Prettify, ThemeConfig } from '@/types';
import { ElementType, ReactNode } from 'react';
import { ThemeProviderProps } from '../theme-provider/theme-provider.types';

export type ThreadProviderProps = Prettify<
	ThemeProviderProps &
		ThreadFoundation & {
			theme?: ThemeConfig;
			children: ReactNode;
		}
>;

export type ThreadFoundation = {
	linkComponent?: ElementType;
};
