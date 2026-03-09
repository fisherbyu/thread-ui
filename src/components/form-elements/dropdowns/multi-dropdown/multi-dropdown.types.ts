import { DropdownOption } from '../dropdown-base/dropdown-base.types';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';
import { IconNames } from '@/components/ui';

export type MultiDropdownProps = {
	/** Defaults to `title` if not provided */
	id?: string;
	/** Label displayed on the dropdown trigger button */
	title?: string;
	/** List of selectable options */
	options: DropdownOption[];
	/** Currently selected values */
	values: (string | number)[];
	/** Called when an option is toggled on or off */
	onToggle: (value: string | number) => void;
	/** Called when all selected values are cleared */
	onClear: () => void;
	/** Icon displayed in the dropdown trigger button */
	icon?: IconNames;
	/** Color variant for the trigger button */
	color?: UtilityColorOptions;
	/** Size variant for the trigger button @default `'md'` */
	size?: UtilitySizeOptions;
	/** Shows the title label above the dropdown @default `true` */
	showLabel?: boolean;
};
