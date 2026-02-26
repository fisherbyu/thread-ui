import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type LoaderProps = {
	color?: Exclude<UtilityColorOptions, 'success' | 'error' | 'info'>;
	label?: string;
	size?: UtilitySizeOptions;
};
