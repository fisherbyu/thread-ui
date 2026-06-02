export const GALLERY_DISPLAY_CONSTANTS = {
	displayItemHeight: '100%',
	displayItemSpacing: '1rem',
	displayItemWidth: '100%',
	trackItemHeight: '6rem',
	itemTrackSpacing: '0.8rem',
} as const satisfies Record<string, string>;

export type DisplayConstantsKeys = keyof typeof GALLERY_DISPLAY_CONSTANTS;

export const GALLERY_DISPLAY_CONSTANT_NAMES: Record<DisplayConstantsKeys, string> = {
	displayItemHeight: '--thread-gallery-display-item-height',
	displayItemSpacing: '--thread-gallery-display-item-spacing',
	displayItemWidth: '--thread-gallery-display-item-width',
	trackItemHeight: '--thread-gallery-track-item-height',
	itemTrackSpacing: '--thread-gallery-item-track-spacing',
};
