import { UtilitySizeOptions } from '@/types';
import { DropdownOption } from '../dropdown-base/dropdown-base.types';
import { ButtonProps } from '@/components/ui';

export type DropdownProps = {
	/** Dropdown ID */
	id?: string;
	/** Optional title rendered above the dropdown */
	title?: string;
	/** Currently selected value — matched against `options` to display the selected label */
	value?: string | number | null;
	/** List of options to display */
	options: DropdownOption[];
	/** Called with the selected option's value when the user makes a selection */
	onSelect: (value: string | number) => void;
	/** Placeholder text shown when no value is selected @default 'Select an option...' */
	placeholder?: string;
	/** Size of Form Label @default `'md'`` */
	size?: UtilitySizeOptions;
	/** Dropdown Color @default 'neutral' */
	color?: ButtonProps['color'];
};
