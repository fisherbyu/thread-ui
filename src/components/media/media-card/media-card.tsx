import { css, cva } from '@/styled-system/css';
import { MediaCardProps } from './media-card.types';
import { center } from '@/styled-system/patterns';
import { H1, Text } from '@/components/typography';
import { Divider, Icon } from '@/components/ui';
import { LinkWrapper, renderImage } from '@/internal-components';
import { isValidElement } from 'react';

export const MediaCard = ({
	description,
	details,
	detailsPosition,
	image,
	imagePosition = 'left',
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
					sm: { maxWidth: '576px' },
					md: { maxWidth: '672px' },
					lg: { maxWidth: '896px' },
				},
			},
			defaultVariants: {
				size: 'md',
			},
		}),
		title: css({
			width: '100%',
			marginX: 'auto',
		}),
		contents: css({
			width: '100%',
			marginX: 'auto',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '0.5rem',
			flexDirection: {
				base: 'column',
				lg: imagePosition === 'left' ? 'row' : 'row-reverse',
			},
		}),
		imageBlock: css({
			width: {
				base: '100%',
				lg: '4/12',
			},
			marginX: 'auto',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: {
				base: '0.5rem',
				lg: '0.75rem',
			},
			flexDirection: 'column',
		}),
		image: css({
			borderRadius: 'md',
			borderWidth: 'sm',
			width: '100%',
			maxWidth: '16rem',
			marginX: 'auto',
			marginTop: {
				lg: '0.75rem',
			},
		}),
		links: css({
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '0.5rem',
		}),
		dividerWrapper: css({
			display: {
				lg: 'none',
			},
			marginY: '0.5rem',
			width: '9/12',
		}),
		description: css({
			width: {
				base: '10/12',
				lg: '7/12',
			},
			marginX: 'auto',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '0.5rem',
			flexDirection: {
				base: 'column',
				lg: 'column-reverse',
			},
		}),
		descriptionWrapper: css({
			maxHeight: {
				base: '300px',
				md: 'none',
				lg: '500px',
			},
			overflowY: {
				base: 'auto',
				md: 'visible',
				lg: 'scroll',
			},
		}),
		descriptionBlock: css({}),
	};

	const renderLinks = () =>
		links.map((link, i) =>
			isValidElement(link) ? (
				link
			) : (
				<LinkWrapper link={link.url} key={i}>
					<Icon name={link.iconName} size={24} />
				</LinkWrapper>
			)
		);
	return (
		<div className={styles.container({ size })}>
			<div className={styles.title}>
				<H1 align="center">{title}</H1>
			</div>
			<Divider />
			<div className={styles.contents}>
				<div className={styles.imageBlock}>
					{renderImage(image, undefined, styles.image)}
					<div className={styles.links}>{renderLinks()}</div>
					{detailsPosition === imagePosition && <>DETAILS HERE</>}
				</div>
				<div className={styles.dividerWrapper}>
					<Divider />
				</div>
				<div className={styles.description}>
					{detailsPosition === imagePosition && <>DETAILS HERE</>}
					<div className={styles.descriptionWrapper}>
						{description.map((item, index) => (
							<Text>{item}</Text>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
