import { ThreadTheme } from '@/functions';
import { InfoCardProps } from './info-card.types';
import { css } from '@/styled-system/css';

export const InfoCard = ({ title, url, icon, img }: InfoCardProps) => {
	const styles = {
		card: css({
			margin: 'auto',
			borderRadius: ThreadTheme.borderRadius.lg,
			borderWidth: ThreadTheme.borderSize.md,
			borderColor: ThreadTheme.structure,
			borderStyle: 'solid',
			marginTop: '0.75rem',
			marginBottom: '0.75rem',
			maxHeight: '15rem',
			overflow: 'hidden',
			width: '391px',
			height: '241px',
			backgroundColor: { base: ThreadTheme.background, _hover: ThreadTheme.surface },
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
			height: 'auto',
			minHeight: '100%',
			width: 'auto',
			minWidth: '100%',
		}),
		captionBlock: css({
			padding: '0.5rem',
			height: '16.666667%',
		}),
		caption: css({
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'center',
		}),
		captionIcon: css({
			paddingRight: '0.25rem',
		}),
		captionText: css({
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			fontSize: '0.875rem',
			lineHeight: '1.25rem',
			color: ThreadTheme.text.standard,
		}),
	};
	return (
		<div className={styles.card}>
			<a href={url} className={styles.link}>
				<div className={styles.imageWrapper}>
					<img className={styles.image} src={img} alt="Article Cover Image" />
				</div>
				<div className={styles.captionBlock}>
					<span className={styles.caption}>
						{icon.type === 'emoji' ? (
							<span className={styles.captionIcon} role="img">
								{JSON.parse(`"${icon.content}"`)}
							</span>
						) : (
							<img className={styles.captionIcon} height={23} width={23} src={icon.content} alt="Article Icon" />
						)}
						<p className={styles.captionText}>{title}</p>
					</span>
				</div>
			</a>
		</div>
	);
};
