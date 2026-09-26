import { ElementType, ComponentPropsWithoutRef } from 'react';
import { SurfaceConfigOverrides } from '@/theme/theme-surface-system';
import { Prettify, SurfaceLayerOptions } from '@/types';

export type SurfaceInput = Prettify<
	SurfaceConfigOverrides & {
		layer?: SurfaceLayerOptions | 'none';
	}
>;

type SurfaceOwnProps<T extends ElementType = 'div'> = {
	/** HTML element to render @default 'div' */
	as?: T;
	/** Surface layer configuration */
	surfaceConfig?: SurfaceInput;
	className?: string;
};

export type SurfaceProps<T extends ElementType = 'div'> = SurfaceOwnProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof SurfaceOwnProps<T>>;
