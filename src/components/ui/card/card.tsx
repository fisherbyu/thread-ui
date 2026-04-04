import { cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H3 } from '@/components/typography';
import { Divider } from '../divider';

const styles = {
	cardContainer: cva({
		base: {
			borderWidth: 'sm',
			borderColor: 'structure',
			padding: {
				base: '5',
			},
			marginX: 'auto',
			maxWidth: '850px',
			width: {
				base: '100%',
				md: '75%',
			},
		},
		variants: {
			size: {
				sm: {
					borderRadius: 'sm',
					maxWidth: '600px',
				},
				md: {
					borderRadius: 'md',
				},
				lg: {
					borderRadius: 'lg',
				},
			},
			surfaceColor: {
				surface: {
					backgroundColor: 'surface',
				},
				elevated: {
					backgroundColor: 'elevated',
				},
				overlay: {
					backgroundColor: 'overlay',
				},
				hover: {
					backgroundColor: 'hover',
				},
				none: {
					backgroundColor: 'transparent',
				},
			},
			shadow: {
				true: {
					boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				},
				false: {
					boxShadow: 'none',
				},
			},
		},
		defaultVariants: {
			size: 'md',
			surfaceColor: 'surface',
			shadow: true,
		},
	}),
	title: cva({
		variants: {
			size: {
				sm: {
					marginBottom: '1',
				},
				md: {
					marginBottom: '3',
				},
				lg: {
					marginBottom: '3',
				},
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}),
};

/**
 * General-purpose content card container with optional title, divider, shadow, and surface color variants.
 *
 * @example
 * <Card title={{ text: 'Details', divider: true }} size="md" shadow>
 *   <div>Card content here</div>
 * </Card>
 */
export const Card = ({
	surfaceColor = 'surface',
	children,
	size = 'md',
	shadow = true,
	title,
}: CardProps) => {
	return (
		<div className={styles.cardContainer({ size, surfaceColor, shadow })}>
			{title && (
				<div className={styles.title({ size })}>
					<H3 align={title.align} inline>
						{title.text}
					</H3>
					{title?.divider && <Divider />}
				</div>
			)}
			<div>{children}</div>
		</div>
	);
};
