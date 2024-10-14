import { getSize } from './get-size';
import { validateSpacing } from './validate-space';
/**
 * Generate Size for JSX Element
 * @param input: number | string
 * @returns sizing val: string | undefined
 */
export const formatSpace = (input: number | string | undefined) => {
	// If number, process with styling constant
	if (typeof input === 'number') {
		return `${getSize(input)}px`;
	}
	// If valid string, return value:
	else if (input && typeof input === 'string' && validateSpacing(input)) {
		return input;
	} else return undefined;
};
