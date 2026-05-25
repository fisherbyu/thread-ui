import type {
	ShadowOptions,
	StructureColorOptions,
	BgColorOptions,
	SurfaceLayerOptions,
	ZIndexOptions,
} from '@/types';

export type SurfaceConfig = {
	bg: BgColorOptions;
	shadow: ShadowOptions;
	structure: StructureColorOptions | 'none';
	zIndex: ZIndexOptions | 'none';
};

/** Surface Layer Order - Returns next highest layer */
export const NextSurfaceLayerMap: Record<SurfaceLayerOptions, SurfaceLayerOptions | null> = {
	inset: 'canvas',
	canvas: 'surface',
	surface: 'elevated',
	elevated: 'overlay',
	overlay: null,
};

/** Surface Layer System — maps each layer to its default bg, shadow, structure, and zIndex */
export const SurfaceLayerMap: Record<SurfaceLayerOptions, SurfaceConfig> = {
	canvas: {
		bg: 'canvas',
		shadow: 'none',
		structure: 'none',
		zIndex: 'none',
	},
	inset: {
		bg: 'inset',
		shadow: 'none',
		structure: 'default',
		zIndex: 'none',
	},
	surface: {
		bg: 'surface',
		shadow: 'sm',
		structure: 'subtle',
		zIndex: 'none',
	},
	elevated: {
		bg: 'elevated',
		shadow: 'md',
		structure: 'subtle',
		zIndex: 'sticky',
	},
	overlay: {
		bg: 'overlay',
		shadow: 'lg',
		structure: 'none',
		zIndex: 'overlay',
	},
};
