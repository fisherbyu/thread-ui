import { cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H3 } from '@/components/typography';
import { Divider } from '../divider';
import { SurfaceLevelMap } from '@/theme';

const styles = {
	cardContainer: cva({
		base: {
			borderStyle: 'solid',
			padding: {
				base: '5',
			},
			marginX: 'auto',
			maxWidth: '850px',
			width: {
				base: '100%',
				md: '75%',
			},
			transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
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
			surface: {
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
			surface: 'surface',
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
 * <Card level="surface" interactive>
 *   <div>Clickable card</div>
 * </Card>
 *
 * // Or granular overrides
 * <Card surface="elevated" shadow="md" structure="none">
 *   <div>Custom card</div>
 * </Card>
 */
export const Card = ({
	level = 'surface',
	surface,
	shadow,
	structure,
	children,
	size = 'md',
	title,
}: CardProps) => {
	// Resolve from level, allow individual overrides
	const defaults = SurfaceLevelMap[level];

	const resolvedSurface = surface ?? defaults.surface;
	const resolvedShadow = shadow ?? defaults.shadow;
	const resolvedStructure = structure ?? defaults.structure;

	return (
		<div
			className={styles.cardContainer({
				size,
				surface: resolvedSurface,
				shadow: resolvedShadow,
				structure: resolvedStructure,
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
