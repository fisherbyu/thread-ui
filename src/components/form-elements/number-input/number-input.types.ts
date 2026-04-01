import { Prettify } from '@/types';
import { InputProps } from '../input-props.types';

export type NumberInputProps = Prettify<
	InputProps<number | null> & {
		/** Applies dark styling */
		dark?: boolean;
		/** Minimum allowed value */
		min?: number;
		/** Maximum allowed value */
		max?: number;
	}
>;
