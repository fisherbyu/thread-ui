import { Button, IconButton } from '@/components';
import { ConditionalWrapper } from '../conditional-wrapper';
import { OptionalIconButtonProps } from './optional-icon-button.types';

export const OptionalIconButton = (props: OptionalIconButtonProps) => {
	const { name, children, ...buttonProps } = props;

	const iconButtonProps = name ? { ...buttonProps, name } : undefined;

	return (
		<ConditionalWrapper
			wrapper={iconButtonProps ? IconButton : undefined}
			wrapperProps={iconButtonProps}
			fallbackWrapper={{ wrapper: Button, wrapperProps: buttonProps }}
		>
			{children}
		</ConditionalWrapper>
	);
};
