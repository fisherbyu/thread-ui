import { ReactNode } from 'react';
import { UtilityColorOptions } from '@/types';

export type NavigationLogoProps = {
	href: string;
	logo: ReactNode;
	color?: UtilityColorOptions;
};
