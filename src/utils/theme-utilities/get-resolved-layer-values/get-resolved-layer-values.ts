import { SurfaceConfig, SurfaceLayerMap } from '@/theme/theme-surface-system';
import {
	BgColorOptions,
	ShadowOptions,
	StructureColorOptions,
	SurfaceLayerOptions,
	ZIndexOptions,
} from '@/types';

type GetResolvedLayerValuesProps = {
	layer: SurfaceLayerOptions | 'none';
	bg?: BgColorOptions;
	shadow?: ShadowOptions;
	structure?: 'none' | StructureColorOptions;
	zIndex?: 'none' | ZIndexOptions;
};

// Fallback config when layer is 'none' — everything off, individual props can still override
const NONE_LAYER_DEFAULTS: SurfaceConfig = {
	bg: 'none',
	shadow: 'none',
	structure: 'none',
	zIndex: 'none',
};

export const getResolvedLayerValues = ({
	layer,
	bg,
	shadow,
	structure,
	zIndex,
}: GetResolvedLayerValuesProps): SurfaceConfig => {
	const defaults = layer === 'none' ? NONE_LAYER_DEFAULTS : SurfaceLayerMap[layer];

	return {
		bg: bg ?? defaults.bg,
		shadow: shadow ?? defaults.shadow,
		structure: structure ?? defaults.structure,
		zIndex: zIndex ?? defaults.zIndex,
	};
};
