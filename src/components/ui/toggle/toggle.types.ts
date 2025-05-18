import { UtilityColorOptions } from '../../../types';

export type ToggleProps = {
	isOn: boolean;
	onToggle: () => void;
	color?: UtilityColorOptions;
};
