export type InputProps<T> = {
	/** Defaults to `name` if not provided */
	id?: string;
	/** Form field name */
	name: string;
	/** Label text rendered above the input */
	title?: string;
	/** Controlled value */
	value?: T;
	required?: boolean;
	placeholder?: string;
	/** Called when the input value changes */
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => void;
};
