import { ComponentType, ReactNode } from 'react';

type WrapperType = ComponentType<any> | 'div' | 'fragment';

export type ConditionalWrapperProps = {
	children: ReactNode;
	wrapper?: WrapperType;
	wrapperProps?: Record<string, unknown>;
	fallbackWrapper?: Omit<ConditionalWrapperProps, 'children' | 'fallbackWrapper'>;
};
