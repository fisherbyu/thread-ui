import { BodyFontSizeOptions, SpacingScaleOptions } from '@/types';
import { MarginBottomOption } from '../typography.types';

/** Spacing token used for body text when `marginBottom` is `true`, keyed by `size` */
export const BODY_MARGIN_BOTTOM_MAP: Record<BodyFontSizeOptions, SpacingScaleOptions> = {
	xxs: 'xs',
	xs: 'xs',
	sm: 'xs',
	md: 'sm',
	lg: 'sm',
	xl: 'md',
};

/** Options for `resolveMarginBottom` */
type ResolveMarginBottomOptions = {
	/** Whether margin applies when the value is omitted */
	defaultOn: boolean;
	/** Token used when margin is on — omit to fall back to the role default */
	onValue?: SpacingScaleOptions;
};

/**
 * Resolves a `MarginBottomOption` to a spacing token for `getResolvedTypographyValues`.
 * Returns `undefined` when the role default should apply.
 *
 * @example
 * resolveMarginBottom(true, { defaultOn: false, onValue: BODY_MARGIN_BOTTOM_MAP['md'] }); // 'sm'
 * @example
 * resolveMarginBottom(undefined, { defaultOn: true }); // undefined (role default)
 */
export const resolveMarginBottom = (
	value: MarginBottomOption | undefined,
	{ defaultOn, onValue }: ResolveMarginBottomOptions
): SpacingScaleOptions | undefined => {
	if (typeof value === 'string') return value;

	const isOn = value ?? defaultOn;

	return isOn ? onValue : 'none';
};
