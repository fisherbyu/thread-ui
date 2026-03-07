/**
 * A single option in the Dropdown list.
 */
export type DropdownOption = {
	/** Display text shown in the list */
	label: string;
	/** Value passed to `onSelect` when this option is chosen */
	value: string | number;
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
};
