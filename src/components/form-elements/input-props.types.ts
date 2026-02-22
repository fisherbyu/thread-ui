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
	/** Controlled value */
	value: TValue;
	required?: boolean;
	placeholder?: string;
	/** Called when the input value changes */
	onChange: (e: TChange) => void;
};
