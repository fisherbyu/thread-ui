import { css, cva } from '@/styled-system/css';
import { MediaCardProps } from './media-card.types';
import { center } from '@/styled-system/patterns';
import { H1 } from '@/components/typography';
import { Divider } from '@/components/ui';

export const MediaCard = ({
	description,
	details,
	detailsPosition,
	image,
	imagePosition,
	links,
	size = 'md',
	title,
}: MediaCardProps) => {
	const styles = {
		container: cva({
			base: {
				alignItems: 'center',
				borderRadius: '6px',
				borderWidth: '1px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 2,
				marginX: 'auto',
				padding: {
					base: 2,
					lg: 3,
				},
				width: '83%',
			},
			variants: {
				size: {
					sm: { maxWidth: 36 },
					md: { maxWidth: 42 },
					lg: { maxWidth: 56 },
				},
			},
		}),
		title: css({
			width: '100%',
			marginX: 'auto',
		}),
	};
	return (
		<div className={styles.container({ size })}>
			<div className={styles.title}>
				<H1 align="center">{title}</H1>
			</div>
			<Divider />
		</div>
	);
};
