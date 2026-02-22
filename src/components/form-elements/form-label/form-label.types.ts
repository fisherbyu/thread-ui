export type FormLabelProps = {
	/** Defaults to `name` if not provided */
	id?: string;
	/** Associates the label with its form control via `htmlFor` */
	name: string;
	/** Text displayed in the label */
	title?: string;
};
