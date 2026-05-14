import { cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H3 } from '@/components/typography';
import { Divider } from '../divider';
import { getResolvedLayerValues } from '@/utils';

const styles = {
	cardContainer: cva({
		base: {
			borderStyle: 'solid',
			padding: {
				base: '5',
			},
			marginX: 'auto',
			transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
		},
		variants: {
			size: {
				sm: {
					borderRadius: 'sm',
					maxWidth: '150',
				},
				md: {
					borderRadius: 'md',
				},
				lg: {
					borderRadius: 'lg',
				},
			},
			fullWidth: {
				true: {
					width: '100%',
				},
				false: {
					maxWidth: '213',
					width: {
						base: '100%',
						md: '75%',
					},
				},
			},
			bg: {
				none: {},
				canvas: { backgroundColor: 'canvas' },
				inset: { backgroundColor: 'inset' },
				surface: { backgroundColor: 'surface' },
				elevated: { backgroundColor: 'elevated' },
				overlay: { backgroundColor: 'overlay' },
			},
			shadow: {
				none: { boxShadow: 'none' },
				sm: { boxShadow: 'sm' },
				md: { boxShadow: 'md' },
				lg: { boxShadow: 'lg' },
			},
			structure: {
				none: { borderWidth: '0' },
				subtle: { borderWidth: 'md', borderColor: 'structure.subtle' },
				default: { borderWidth: 'md', borderColor: 'structure.default' },
				strong: { borderWidth: 'md', borderColor: 'structure.strong' },
			},
		},
		defaultVariants: {
			size: 'md',
			fullWidth: false,
			bg: 'surface',
			shadow: 'none',
			structure: 'subtle',
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
 * General-purpose content card container with optional title, divider, and surface level control.
 *
 * @example
 * // Use level shorthand
 * <Card layer="surface" interactive>
 *   <div>Clickable card</div>
 * </Card>
 *
 * // Or granular overrides
 * <Card bg="elevated" shadow="md" structure="none">
 *   <div>Custom card</div>
 * </Card>
 */
export const Card = ({
	layer = 'surface',
	bg,
	shadow,
	structure,
	children,
	size = 'md',
	fullWidth = false,
	title,
}: CardProps) => {
	// Resolve from level, allow individual overrides
	const layerValues = getResolvedLayerValues({ layer, bg, shadow, structure });

	return (
		<div
			className={styles.cardContainer({
				size,
				fullWidth,
				bg: layerValues.bg,
				shadow: layerValues.shadow,
				structure: layerValues.structure,
			})}
		>
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
