import { Prettify } from '@/types';
import { InputProps } from '../input-props.types';

export type NumberInputProps = Prettify<
	InputProps<number | null> & {
		/** Minimum allowed value */
		min?: number;
		/** Maximum allowed value */
		max?: number;
	}
>;
