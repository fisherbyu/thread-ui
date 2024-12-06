import { ReactNode } from 'react';
import { ColorOptions } from '../../../../types';

export type NavIconItemProps = {
	href: string;
	logo: ReactNode;
	color?: ColorOptions;
};
