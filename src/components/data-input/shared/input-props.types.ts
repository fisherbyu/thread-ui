import { UtilitySizeOptions } from '@/types';

/** HTML Elements that accept inputs */
export type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Props shared by every input element, independent of control mode. */
export type BaseInputProps = {
	/** Defaults to `name`, or a generated id when neither is set */
	id?: string;
	/** Form field name; omit to keep the value out of form submission */
	name?: string;
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
	/** Error message rendered below the input. Overrides native validation message and blocks form submission while set */
	error?: string;
	/** Optionally render divider beneath label @default false */
	divider?: boolean;
};

/** Control props for inputs that only support controlled use. */
export type ControlledValueProps<TValue, TChange> = {
	/** Controlled value */
	value: TValue;
	/** Called when the input value changes */
	onChange: (e: TChange) => void | Promise<void>;
};

/** Controlled when `value` is passed, uncontrolled otherwise. */
type ControllableValueProps<TValue, TChange> =
	| (ControlledValueProps<TValue, TChange> & {
			defaultValue?: never;
	  })
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
> = BaseInputProps & ControllableValueProps<TValue, TChange>;
