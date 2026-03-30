'use client';
import { Icon } from '@/components/ui';
import { InfoCardProps } from './info-card.types';
import { css, cx } from '@/styled-system/css';
import { Text } from '@/components/typography';
import { DynamicIcon } from '@/internal-components';

const styles = {
	card: css({
		margin: 'auto',
		border: 'solid',
		borderRadius: 'md',
		borderWidth: 'md',
		borderColor: 'structure',
		borderStyle: 'solid',
		maxHeight: '15rem',
		overflow: 'hidden',
		maxWidth: '391px',
		aspectRatio: '8 / 5',
		width: '100%',
		backgroundColor: { base: 'background', _hover: 'surface' },
	}),
	cardContent: css({
		display: 'flex',
		flexDirection: 'column',
	}),
	link: css({
		cursor: 'pointer',
	}),
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
 * Linked card displaying a cover image, title, and icon. Supports named icons, emojis, and external SVGs.
 *
 * @example
 * // Named icon
 * <InfoCard title="Getting Started" url="/docs" icon="BookOpen" img="/cover.jpg" />
 *
 * @example
 * // Emoji
 * <InfoCard title="Recipes" url="/recipes" icon={{ type: 'emoji', emoji: '🍋' }} img="/cover.jpg" />
 */
export const InfoCard = ({ title, url, icon, img }: InfoCardProps) => {
	return (
		<a href={url} className={cx(styles.cardContent, styles.link, styles.card)}>
			<div className={styles.imageWrapper}>
				<img className={styles.image} src={img} alt="Article Cover Image" />
			</div>
			<div className={styles.caption}>
				<DynamicIcon icon={icon} size={24} />
				<Text size="sm" truncate inline>
					{title}
				</Text>
			</div>
		</a>
	);
};
