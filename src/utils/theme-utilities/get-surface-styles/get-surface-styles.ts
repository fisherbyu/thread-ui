import { cva } from '@/styled-system/css';
import { SurfaceConfig } from '@/theme/theme-surface-system';
import { DeepPartial } from '@/types';

/** Surface CVA — map individual token keys to style declarations. */
const getSurfaceStylesCva = cva({
	variants: {
		bg: {
			none: { bg: 'transparent' },
			canvas: { bg: 'canvas' },
			inset: { bg: 'inset' },
			surface: { bg: 'surface' },
			elevated: { bg: 'elevated' },
			overlay: { bg: 'overlay' },
		},
		shadow: {
			none: { boxShadow: 'none' },
			sm: { boxShadow: 'sm' },
			md: { boxShadow: 'md' },
			lg: { boxShadow: 'lg' },
		},
		structure: {
			none: {},
			default: { borderWidth: 'md', borderStyle: 'solid', borderColor: 'structure.default' },
			subtle: { borderWidth: 'md', borderStyle: 'solid', borderColor: 'structure.subtle' },
			strong: { borderWidth: 'md', borderStyle: 'solid', borderColor: 'structure.strong' },
		},
		zIndex: {
			none: {},
			base: { zIndex: 'base' },
			overlay: { zIndex: 'overlay' },
			sticky: { zIndex: 'sticky' },
			modal: { zIndex: 'modal' },
			system: { zIndex: 'system' },
		},
	},
});

export const getSurfaceStyles = (props: DeepPartial<SurfaceConfig>) => {
	return getSurfaceStylesCva(props);
};
