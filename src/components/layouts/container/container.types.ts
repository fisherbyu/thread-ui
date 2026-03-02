import { SurfaceColorOptions } from '@/types';
import { JSX, ReactNode } from 'react';

type BlockElements = Pick<JSX.IntrinsicElements, 'div' | 'section'>;

export type ContainerProps = {
	/** HTML element to render as @default `'div'` */
	as?: keyof BlockElements;
	/** Background color token @default `'background'` */
	bgColor?: SurfaceColorOptions;
	children: ReactNode;
};
