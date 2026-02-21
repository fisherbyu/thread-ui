export type DropdownProps = {
	label?: string;
	value?: string | number | null;
	options: DropdownOption[];
	onSelect: (value: string | number) => void;
	placeholder?: string;
};

export type DropdownOption = {
	label: string;
	value: string | number;
};
