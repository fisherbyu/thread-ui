import { BgColorOptions, Prettify } from '@/types';
import { JSX, ReactNode } from 'react';

type BlockElements = Pick<JSX.IntrinsicElements, 'div' | 'section' | 'footer'>;

export type ContainerProps = {
	/** HTML element to render as @default `'div'` */
	as?: Prettify<keyof BlockElements>;
	/** Background color token @default `'none'` */
	bg?: BgColorOptions;
	/** Container Contents */
	children: ReactNode;
};
