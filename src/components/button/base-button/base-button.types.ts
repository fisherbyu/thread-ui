import { ButtonProps } from '../button.types';

export type BaseButtonProps = ButtonProps & {
	onHoverStateChange?: (isHovered: boolean) => void;
};
