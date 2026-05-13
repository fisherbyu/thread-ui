import { cva, cx } from '@/styled-system/css';
import { container } from '@/styled-system/patterns';
import { ContainerProps } from './container.types';

const styles = cva({
	variants: {
		bg: {
			none: { backgroundColor: 'transparent' },
			canvas: { backgroundColor: 'canvas' },
			inset: { backgroundColor: 'inset' },
			surface: { backgroundColor: 'surface' },
			elevated: { backgroundColor: 'elevated' },
			overlay: { backgroundColor: 'overlay' },
		},
	},
	defaultVariants: {
		bg: 'none',
	},
});

/**
 * Layout container with a max-width, horizontal padding, and optional background color.
 * Renders as `div` by default but can be swapped for `section`.
 *
 * @example
 * <Container as="section" bgColor="surface">
 *   <PageHeader title="About" />
 * </Container>
 */
export const Container = ({ as: Tag = 'div', bg = 'none', children }: ContainerProps) => {
	return <Tag className={cx(styles({ bg }), container())}>{children}</Tag>;
};
