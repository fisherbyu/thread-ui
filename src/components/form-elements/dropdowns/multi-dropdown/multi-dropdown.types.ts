import { DropdownOption } from '../dropdown-base/dropdown-base.types';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';
import { IconNames } from '@/components/ui';

export type MultiDropdownProps = {
	id?: string;
	title?: string;
	options: DropdownOption[];
	values: (string | number)[];
	onToggle: (value: string | number) => void;
	onClear: () => void;
	icon?: IconNames;
	color?: UtilityColorOptions;
	size?: UtilitySizeOptions;
	showLabel?: boolean;
};
