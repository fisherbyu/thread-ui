import { Icon } from '@/components/ui';
import { InfoCardProps } from './info-card.types';
import { css } from '@/styled-system/css';
import { Text } from '@/components/typography';

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
	link: css({
		cursor: 'pointer',
	}),
	imageWrapper: css({
		overflow: 'hidden',
		width: '100%',
		height: '83.333333%',
	}),
	image: css({
		height: '100%',
		width: '100%',
		objectFit: 'cover',
	}),
	captionBlock: css({
		padding: '2.5',
		height: '10',
	}),
	caption: css({
		display: 'flex',
		gap: '2',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
	}),
	captionIcon: css({
		paddingRight: '0.25rem',
	}),
};

/**
 * Linked card displaying a cover image, title, and icon. Supports named icons, emojis, and SVGs.
 *
 * @example
 * <InfoCard
 *   title="Getting Started"
 *   url="/docs/getting-started"
 *   icon="BookOpen"
 *   img="/images/cover.jpg"
 * />
 */
export const InfoCard = ({ title, url, icon, img }: InfoCardProps) => {
	const renderIcon = () => {
		if (typeof icon === 'string') {
			return <Icon name={icon} size={24} />;
		} else if (icon.type === 'svg') {
			return (
				<img
					className={styles.captionIcon}
					height={23}
					width={23}
					src={icon.content}
					alt="Article Icon"
				/>
			);
		} else {
			<span className={styles.captionIcon} role="img">
				{JSON.parse(`"${icon.content}"`)}
			</span>;
		}
	};

	return (
		<div className={styles.card}>
			<a href={url} className={styles.link}>
				<div className={styles.imageWrapper}>
					<img className={styles.image} src={img} alt="Article Cover Image" />
				</div>
				<div className={styles.captionBlock}>
					<span className={styles.caption}>
						{renderIcon()}
						<Text size="sm" truncate inline>
							{title}
						</Text>
					</span>
				</div>
			</a>
		</div>
	);
};
