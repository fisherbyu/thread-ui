import { SurfaceConfig, SurfaceLayerMap } from '@/theme/theme-surface-system';
import {
	BgColorOptions,
	ShadowOptions,
	StructureColorOptions,
	SurfaceLayerOptions,
	ZIndexOptions,
} from '@/types';

type GetResolvedLayerValuesProps = {
	layer: SurfaceLayerOptions;
	bg?: BgColorOptions;
	shadow?: ShadowOptions;
	structure?: 'none' | StructureColorOptions;
	zIndex?: 'none' | ZIndexOptions;
};

export const getResolvedLayerValues = ({
	layer,
	bg,
	shadow,
	structure,
	zIndex,
}: GetResolvedLayerValuesProps): SurfaceConfig => {
	const defaults = SurfaceLayerMap[layer];
	return {
		bg: bg ?? defaults.bg,
		shadow: shadow ?? defaults.shadow,
		structure: structure ?? defaults.structure,
		zIndex: zIndex ?? defaults.zIndex,
	};
};
