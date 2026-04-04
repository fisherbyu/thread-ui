import type {
	ShadowOptions,
	StructureColorOptions,
	SurfaceColorOptions,
	SurfaceLayerOptions,
	ZIndexOptions,
} from '@/types';

type SurfaceConfig = {
	surface: SurfaceColorOptions;
	shadow: ShadowOptions;
	structure: StructureColorOptions | 'none';
	zIndex: ZIndexOptions | 'none';
};

/** Surface System Values */
export const SurfaceLevelMap: Record<SurfaceLayerOptions, SurfaceConfig> = {
	canvas: {
		surface: 'canvas',
		shadow: 'none',
		structure: 'none',
		zIndex: 'none',
	},
	inset: {
		surface: 'inset',
		shadow: 'none',
		structure: 'default',
		zIndex: 'none',
	},
	surface: {
		surface: 'surface',
		shadow: 'none',
		structure: 'subtle',
		zIndex: 'none',
	},
	elevated: {
		surface: 'elevated',
		shadow: 'sm',
		structure: 'subtle',
		zIndex: 'sticky',
	},
	overlay: {
		surface: 'overlay',
		shadow: 'lg',
		structure: 'none',
		zIndex: 'overlay',
	},
};
