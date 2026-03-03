import { ConditionalWrapperProps } from './conditional-wrapper.types';

export const ConditionalWrapper = ({
	children,
	wrapper = 'fragment',
	wrapperProps = {},
}: ConditionalWrapperProps) => {
	if (wrapper === 'fragment') return <>{children}</>;
	if (wrapper === 'div') return <div {...wrapperProps}>{children}</div>;

	const Wrapper = wrapper;
	return <Wrapper {...(wrapperProps as any)}>{children}</Wrapper>;
};
