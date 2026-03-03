import { ComponentType, ReactNode } from 'react';

type WrapperType = ComponentType<{ children: ReactNode }> | 'div' | 'fragment';

export type ConditionalWrapperProps = {
	children: ReactNode;
	wrapper?: WrapperType;
	wrapperProps?: Record<string, unknown>;
};
