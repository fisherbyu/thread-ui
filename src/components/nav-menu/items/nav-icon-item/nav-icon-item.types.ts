import { ReactNode } from 'react';
import { UtilityColorOptions } from '../../../../types';

export type NavIconItemProps = {
	href: string;
	logo: ReactNode;
	color?: UtilityColorOptions;
};
