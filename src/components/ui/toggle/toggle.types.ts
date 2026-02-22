import { UtilityColorOptions } from '../../../types';

export type ToggleProps = {
	/** Controlled on/off state */
	isOn: boolean;
	/** Called when the toggle is clicked */
	onToggle: () => void;
	/** Color of the track when on @default `'success'` */
	color?: UtilityColorOptions;
};
