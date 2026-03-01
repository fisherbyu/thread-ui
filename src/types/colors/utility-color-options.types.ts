import { TextColorOptions } from '../theme';

/** Color tokens available across utility components */
export type UtilityColorOptions =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'black'
	| 'gray'
	| 'success'
	| 'error'
	| 'info'
	| 'text';

/** Extended color options for text and typography components. Includes semantic text tokens in addition to utility colors */
export type ColoredTextOptions =
	| Exclude<UtilityColorOptions, 'text'>
	| 'standard'
	| 'disabled'
	| 'accent'
	| 'text-secondary';
