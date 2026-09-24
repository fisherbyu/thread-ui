import { UtilitySizeOptions } from '@/types';

export type FormLabelProps = {
	/** Id of the control this label points to via `htmlFor`; the label's own id is `${id}-label` */
	id: string;
	/** Text displayed in the label */
	title?: string;
	/** Label Size @default `'md'`` */
	size?: UtilitySizeOptions;
	/** Optionally render divider beneath label @default false */
	divider?: boolean;
};
