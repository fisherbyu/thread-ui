import { ReactNode } from 'react';
import { LayoutComponentProps } from './layout-component.types';
import { Container } from './container';
import { ConditionalWrapper } from '@/internal-components';

type LayoutWrapperProps = LayoutComponentProps & {
	children: ReactNode;
};

export const LayoutWrapper = ({ container, children }: LayoutWrapperProps) => {
	const wrapper = container ? Container : 'fragment';
	const wrapperProps = typeof container === 'object' ? container : {};

	return (
		<ConditionalWrapper wrapper={wrapper} wrapperProps={wrapperProps}>
			{children}
		</ConditionalWrapper>
	);
};
