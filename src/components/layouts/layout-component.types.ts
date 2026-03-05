import type { BreakpointToken as PandaBreakpointToken } from '@/styled-system/tokens';

type BreakpointToken = PandaBreakpointToken | 'base';

export type ResponsiveValue<T> = T | Partial<Record<BreakpointToken, T>>;

export type LayoutComponentProps = {
	container?: boolean;
};
