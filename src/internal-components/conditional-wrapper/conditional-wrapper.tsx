import { ConditionalWrapperProps } from './conditional-wrapper.types';

export const ConditionalWrapper = ({
	children,
	wrapper,
	wrapperProps = {},
	fallbackWrapper,
}: ConditionalWrapperProps) => {
	const resolved = wrapper ?? fallbackWrapper?.wrapper ?? 'fragment';
	const resolvedProps = wrapper ? wrapperProps : (fallbackWrapper?.wrapperProps ?? {});

	if (resolved === 'fragment') return <>{children}</>;
	if (resolved === 'div') return <div {...resolvedProps}>{children}</div>;
	const Wrapper = resolved;
	return <Wrapper {...(resolvedProps as any)}>{children}</Wrapper>;
};
