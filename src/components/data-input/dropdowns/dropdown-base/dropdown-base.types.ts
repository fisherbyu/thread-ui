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

/** Internal props for `DropdownBase`; values are always arrays so single and multi share one path. */
export type DropdownBaseProps<T extends DropdownValue> = BaseInputProps &
	DropdownSharedProps<T> & {
		/** Controlled selection */
		value?: T[];
		/** Initial selection for uncontrolled use */
		defaultValue?: T[];
		/** Called with the full next selection */
		onChange?: (value: T[]) => void | Promise<void>;
		/** Allow several selections and keep the list open on select @default `false` */
		multiple?: boolean;
	};
