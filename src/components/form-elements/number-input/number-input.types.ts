import { InputProps } from '../input-props.types';

export type NumberInputProps = InputProps<number> & {
	/** Applies dark styling */
	dark?: boolean;
	/** Minimum allowed value */
	min?: number;
	/** Maximum allowed value */
	max?: number;
};
