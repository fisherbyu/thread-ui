import type { BreakpointToken as PandaBreakpointToken } from '@/styled-system/tokens';
import { ContainerProps } from './container';

type BreakpointToken = PandaBreakpointToken | 'base';

export type ResponsiveValue<T> = T | Partial<Record<BreakpointToken, T>>;

export type LayoutComponentProps = {
	/** Wraps the layout in a container */
	container?: boolean | ContainerProps;
};
