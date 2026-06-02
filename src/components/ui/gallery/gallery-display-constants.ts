export const GALLERY_DISPLAY_CONSTANTS = {
	displayItemHeight: '19rem',
	displayItemSpacing: '1rem',
	displayItemWidth: '100%',
} as const satisfies Record<string, string>;

export type DisplayConstantsKeys = keyof typeof GALLERY_DISPLAY_CONSTANTS;

export const GALLERY_DISPLAY_CONSTANT_NAMES: Record<DisplayConstantsKeys, string> = {
	displayItemHeight: '--display-item-height',
	displayItemSpacing: '--display-item-spacing',
	displayItemWidth: '--display-item-width',
};
