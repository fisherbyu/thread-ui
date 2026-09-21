import { UtilitySizeOptions } from '@/types';

/** Controlled when `value` is passed, uncontrolled otherwise. */
type ControlProps<TValue, TChange> =
	| {
			/** Controlled value */
			value: TValue;
			/** Called when the input value changes */
			onChange: (e: TChange) => void | Promise<void>;
			defaultValue?: never;
	  }
	| {
			value?: never;
			/** Called when the input value changes */
			onChange?: (e: TChange) => void | Promise<void>;
			/** Initial value for uncontrolled use */
			defaultValue?: TValue;
	  };

export type InputProps<
	TValue,
	TChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
> = {
	/** Defaults to `name` if not provided */
	id?: string;
	/** Form field name */
	name: string;
	/** Label text rendered above the input */
	title?: string;
	/** Require value for form submission */
	required?: boolean;
	/** Descriptive text rendered within input */
	placeholder?: string;
	/** Size @default `md` */
	size?: UtilitySizeOptions;
	/** Block interaction and exclude the value from form submission */
	disabled?: boolean;
} & ControlProps<TValue, TChange>;
