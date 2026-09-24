import { ButtonProps, IconNames } from '@/components/ui';
import { UtilityColorOptions, UtilitySizeOptions } from '@/types';

/** Values a dropdown option can hold. */
export type DropdownValue = string | number;

/** A single option in the dropdown list. */
export type DropdownOption<T extends DropdownValue = DropdownValue> = {
	/** Display text shown in the list */
	label: string;
	/** Value passed to `onChange` when this option is chosen */
	value: T;
	/** Block selecting this option */
	disabled?: boolean;
};

export type DropdownBaseProps = {
	id?: string;
	title?: string;
	placeholder?: string;
	options: DropdownOption[];
	isOpen: boolean;
	onClose: () => void;
	onToggle: () => void;
	triggerLabel: string;
	renderItem: (option: DropdownOption, index: number) => React.ReactNode;
	listHeader?: React.ReactNode;
	size?: UtilitySizeOptions;
	icon?: IconNames;
	color?: ButtonProps['color'];
};
