import type { BreakpointToken as PandaBreakpointToken } from '@/styled-system/tokens';
import { ContainerProps } from './container';

type BreakpointToken = PandaBreakpointToken | 'base';

export type ResponsiveValue<T> = T | Partial<Record<BreakpointToken, T>>;

type ContainerConfig = Omit<ContainerProps, 'children'>;

export type LayoutComponentProps = {
	/** Wraps the layout in a container */
	container?: boolean | ContainerConfig;
};
