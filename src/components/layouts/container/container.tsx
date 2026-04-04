import { cva, cx } from '@/styled-system/css';
import { container } from '@/styled-system/patterns';
import { ContainerProps } from './container.types';

const styles = cva({
	variants: {
		bgColor: {
			none: { backgroundColor: 'transparent' },
			canvas: { backgroundColor: 'canvas' },
			inset: { backgroundColor: 'inset' },
			surface: { backgroundColor: 'surface' },
			elevated: { backgroundColor: 'elevated' },
			overlay: { backgroundColor: 'overlay' },
		},
	},
	defaultVariants: {
		bgColor: 'none',
	},
});

/**
 * Layout container with a max-width, horizontal padding, and optional background color.
 * Renders as `div` by default but can be swapped for `section`.
 *
 * @example
 * <Container as="section" bgColor="xsurfacex">
 *   <PageHeader title="About" />
 * </Container>
 */
export const Container = ({ as: Tag = 'div', bgColor = 'none', children }: ContainerProps) => {
	return <Tag className={cx(styles({ bgColor }), container())}>{children}</Tag>;
};
