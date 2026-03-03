import type { BreakpointToken } from '@/styled-system/tokens';

export type ResponsiveValue<T> = T | Partial<Record<BreakpointToken, T>>;

export type LayoutComponentProps = {
	container?: boolean;
};
