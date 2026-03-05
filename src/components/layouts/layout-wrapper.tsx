import { ReactNode } from 'react';
import { LayoutComponentProps } from './layout-component.types';
import { Container } from './container';
import { ConditionalWrapper } from '@/internal-components';

type LayoutWrapperProps = LayoutComponentProps & {
	children: ReactNode;
};

export const LayoutWrapper = ({ container, children }: LayoutWrapperProps) => {
	const wrapper = container ? Container : 'fragment';
	const { children: _, ...wrapperProps } =
		typeof container === 'object' ? container : { children: null };

	return (
		<ConditionalWrapper wrapper={wrapper} wrapperProps={wrapperProps}>
			{children}
		</ConditionalWrapper>
	);
};
