import { ButtonProps, IconNames } from '@/components/ui';
import { BaseInputProps } from '../../shared/input-props.types';

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

/** Props shared by `Dropdown` and `MultiDropdown` on top of the base input props. */
export type DropdownSharedProps<T extends DropdownValue> = {
	options: DropdownOption<T>[];
	/** Trigger style: a form `field` or a `button` @default `field` */
	variant?: 'field' | 'button';
	/** Trigger color; applies to the `button` variant only @default `neutral` */
	color?: ButtonProps['color'];
	/** Icon rendered at the start of the trigger */
	icon?: IconNames;
	/** Show the `title` label above the trigger; when `false` it stays available to screen readers @default `true` */
	showLabel?: boolean;
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
