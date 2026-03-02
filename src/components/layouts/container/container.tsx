import { cva, cx } from '@/styled-system/css';
import { container } from '@/styled-system/patterns';
import { ContainerProps } from './container.types';

const styles = cva({
	variants: {
		bgColor: {
			background: { backgroundColor: 'background' },
			surface: { backgroundColor: 'surface' },
			elevated: { backgroundColor: 'elevated' },
		},
	},
	defaultVariants: {
		bgColor: 'background',
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
export const Container = ({
	as: Tag = 'div',
	bgColor = 'background',
	children,
}: ContainerProps) => {
	return <Tag className={cx(styles({ bgColor }), container())}>{children}</Tag>;
};
