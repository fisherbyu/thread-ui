import { cva, cx } from '@/styled-system/css';
import { container } from '@/styled-system/patterns';
import { ContainerProps } from './container.types';

const styles = cva({
	variants: {
		bgColor: {
			background: { backgroundColor: 'xbackgroundx' },
			surface: { backgroundColor: 'xsurfacex' },
			elevated: { backgroundColor: 'elevated' },
		},
	},
	defaultVariants: {
		bgColor: 'xbackgroundx',
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
export const Container = ({
	as: Tag = 'div',
	bgColor = 'xbackgroundx',
	children,
}: ContainerProps) => {
	return <Tag className={cx(styles({ bgColor }), container())}>{children}</Tag>;
};
