'use client';
import { InfoCardProps } from './info-card.types';
import { css } from '@/styled-system/css';
import { cva } from '@/styled-system/css';
import { Text } from '@/components/typography';
import { DynamicIcon, renderImage } from '@/internal-components';
import { SurfaceLayerMap } from '@/theme';

const cardStyles = cva({
	base: {
		margin: 'auto',
		borderStyle: 'solid',
		borderRadius: 'md',
		maxHeight: '15rem',
		overflow: 'hidden',
		maxWidth: '391px',
		aspectRatio: '8 / 5',
		width: '100%',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'column',
		transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
		_hover: {
			backgroundColor: 'hover',
		},
		_active: {
			backgroundColor: 'active',
		},
	},
	variants: {
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
		bg: 'surface',
		shadow: 'sm',
		structure: 'subtle',
	},
});

const styles = {
	imageWrapper: css({
		overflow: 'hidden',
		width: '100%',
		flex: '1',
		minHeight: '0',
	}),
	image: css({
		height: '100%',
		width: '100%',
		objectFit: 'cover',
	}),
	caption: css({
		padding: '2.5',
		height: '10',
		display: 'flex',
		gap: '2',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		flexShrink: 0,
	}),
};

/**
 * Linked card displaying a cover image, title, and icon. Always interactive with hover and active states.
 *
 * @example
 * <InfoCard title="Getting Started" url="/docs" icon="BookOpen" image={{ src: '/cover.jpg' }} />
 */
export const InfoCard = ({ title, url, icon, image, layer = 'surface' }: InfoCardProps) => {
	const config = SurfaceLayerMap[layer];

	return (
		<a
			href={url}
			className={cardStyles({
				bg: config.bg,
				shadow: config.shadow,
				structure: config.structure,
			})}
		>
			<div className={styles.imageWrapper}>{renderImage(image, undefined, styles.image)}</div>
			<div className={styles.caption}>
				<DynamicIcon icon={icon} size={24} />
				<Text size="sm" truncate inline>
					{title}
				</Text>
			</div>
		</a>
	);
};
