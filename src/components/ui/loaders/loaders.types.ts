import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

export type LoaderProps = {
	size?: UtilitySizeOptions;
	className?: string;
	label?: string;
	color?: Omit<UtilityColorOptions, 'success' | 'error' | 'info'>;
};
