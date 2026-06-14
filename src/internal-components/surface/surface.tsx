import { ElementType } from 'react';
import { cx } from '@/styled-system/css';
import { getResolvedLayerValues, getSurfaceStyles } from '@/utils';
import { SurfaceProps } from './surface.types';

export const Surface = <T extends ElementType = 'div'>(props: SurfaceProps<T>) => {
	const { as, surfaceConfig, className, children, ...rest } = props;

	const { layer = 'surface', bg, shadow, structure } = surfaceConfig ?? {};
	const Component = (as || 'div') as ElementType;
	const layerValues = getResolvedLayerValues({ layer, bg, shadow, structure });

	return (
		<Component className={cx(getSurfaceStyles(layerValues), className)} {...rest}>
			{children}
		</Component>
	);
};
