import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type LoaderProps = {
	/** Color variant. Excludes semantic colors `'success'`, `'error'`, and `'info'` @default `'primary'` */
	color?: Exclude<UtilityColorOptions, 'success' | 'error' | 'info'>;
	/** Accessible label for screen readers @default `'Loading...'` */
	label?: string;
	/** Size variant @default `'md'` */
	size?: UtilitySizeOptions;
};
