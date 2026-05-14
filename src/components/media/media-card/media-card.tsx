import { css, cva } from '@/styled-system/css';
import { MediaCardProps } from './media-card.types';
import { H1, Text } from '@/components/typography';
import { Divider, Icon } from '@/components/ui';
import { LinkWrapper, renderImage } from '@/internal-components';
import { SurfaceLayerMap } from '@/theme';
import { cloneElement, isValidElement } from 'react';

const styles = {
	container: cva({
		base: {
			alignItems: 'center',
			borderRadius: 'md',
			borderStyle: 'solid',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: '3',
			marginX: 'auto',
			padding: {
				base: '4',
				lg: '6',
			},
			width: '83%',
		},
		variants: {
			size: {
				sm: { maxWidth: '576px' },
				md: { maxWidth: '672px' },
				lg: { maxWidth: '896px' },
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
			bg: 'surface',
			shadow: 'sm',
			structure: 'subtle',
		},
	}),
	title: css({
		width: '100%',
		marginX: 'auto',
	}),
	contents: cva({
		base: {
			width: '100%',
			marginX: 'auto',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			gap: '2',
		},
		variants: {
			imagePosition: {
				left: {
					flexDirection: {
						base: 'column',
						lg: 'row',
					},
				},
				right: {
					flexDirection: {
						base: 'column',
						lg: 'row-reverse',
					},
				},
			},
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
			base: '2',
			lg: '3',
		},
		flexDirection: 'column',
	}),
	image: css({
		borderRadius: 'md',
		borderWidth: 'sm',
		width: '100%',
		maxWidth: '64',
		marginX: 'auto',
		marginTop: {
			lg: '3',
		},
	}),
	links: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '2',
		color: 'text.standard',
	}),
	dividerWrapper: css({
		display: {
			lg: 'none',
		},
		marginY: '2',
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
		gap: '3',
		display: 'flex',
		flexDirection: {
			base: 'column',
			lg: 'column-reverse',
		},
	}),
	descriptionWrapper: css({
		maxHeight: {
			base: '75',
			md: 'none',
			lg: '125',
		},
		overflowY: {
			base: 'auto',
			md: 'visible',
			lg: 'scroll',
		},
	}),
	details: css({
		display: 'flex',
		flexDirection: 'column',
		gap: '1',
	}),
};

/**
 * Media card with an image, title, description, detail pairs, and icon links.
 * Supports flexible image positioning and placing details in either the image or text column.
 *
 * @example
 * <MediaCard
 *   title="Jane Doe"
 *   description={['Software engineer based in NYC.', 'Passionate about open source.']}
 *   image={{ src: '/jane.jpg', alt: 'Jane Doe' }}
 *   links={[{ iconName: 'GithubLogo', url: 'https://github.com/jane' }]}
 *   details={[{ title: 'Role', details: 'Engineer' }]}
 * />
 */
export const MediaCard = ({
	description,
	details,
	detailsPosition = 'text',
	image,
	imagePosition = 'left',
	layer = 'surface',
	links,
	size = 'md',
	title,
}: MediaCardProps) => {
	// Resolve from layer, allow individual overrides
	const layerConfig = SurfaceLayerMap[layer];

	const linksSection = links.map((link, index) =>
		isValidElement(link) ? (
			cloneElement(link, { key: index })
		) : (
			<LinkWrapper link={link.url} key={index}>
				<Icon name={link.iconName} size={24} />
			</LinkWrapper>
		)
	);

	const mediaDetails = details && (
		<div className={styles.details}>
			{details.map((detail, index) => (
				<span key={index}>
					<Text align="center" size="xs">
						{detail.title}
					</Text>
					<Text align="center" size="xs" bold>
						{detail.details}
					</Text>
				</span>
			))}
		</div>
	);

	return (
		<div
			className={styles.container({
				size,
				bg: layerConfig.bg,
				shadow: layerConfig.shadow,
				structure: layerConfig.structure,
			})}
		>
			<div className={styles.title}>
				<H1 align="center" inline>
					{title}
				</H1>
			</div>
			<Divider marginY="8px" />
			<div className={styles.contents({ imagePosition })}>
				<div className={styles.imageBlock}>
					{renderImage(image, undefined, styles.image)}
					<div className={styles.links}>{linksSection}</div>
					{detailsPosition === 'image' && mediaDetails}
				</div>
				<div className={styles.dividerWrapper}>
					<Divider />
				</div>
				<div className={styles.description}>
					{detailsPosition === 'text' && mediaDetails}
					<div className={styles.descriptionWrapper}>
						{description.map((item, index) => (
							<Text align="center" size="sm" key={index}>
								{item}
							</Text>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
