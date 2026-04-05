import { ImagePanelProps } from './image-panel.types';
import { renderImage } from '@/internal-components';
import { Subtitle, Text, Title } from '@/components';
import { ImageProps } from '@/types';
import { css, cva, cx } from '@/styled-system/css';

const renderPanelImage = (image: ImageProps, smImage?: ImageProps) => {
	const classes = {
		image: css({
			marginX: { base: '0', md: 'auto' },
			borderRadius: 'sm',
		}),
		smImage: css({
			position: 'relative',
			display: { base: 'block !important', md: 'none !important' },
			hideFrom: 'md',
		}),
		standardImg: css({
			width: '100%',
			height: '100%',
		}),
		standardImageWSmall: css({
			display: { base: 'none !important', md: 'block !important' },
			hideBelow: 'md',
		}),
	};

	if (smImage) {
		return (
			<>
				{renderImage(smImage, undefined, cx(classes.image, classes.smImage))}
				{renderImage(
					image,
					undefined,
					cx(classes.image, classes.standardImg, classes.standardImageWSmall)
				)}
			</>
		);
	} else {
		return renderImage(image, undefined, cx(classes.image, classes.standardImg));
	}
};

const sectionWrapper = cva({
	base: {
		width: '100%',
	},
	variants: {
		surface: {
			none: {},
			canvas: { backgroundColor: 'canvas' },
			inset: { backgroundColor: 'inset' },
			surface: { backgroundColor: 'surface' },
			elevated: { backgroundColor: 'elevated' },
			overlay: { backgroundColor: 'overlay' },
		},
	},
	defaultVariants: {
		surface: 'none',
	},
});

const panelStyles = cva({
	base: {
		display: 'flex',
		gap: { base: '12px', lg: '20px' },
		justifyContent: 'center',
		alignItems: 'stretch',
		width: '100%',
		marginRight: 'auto',
		maxWidth: { base: 'none', md: '800px', lg: '1400px' },
		marginLeft: 'auto',
		paddingRight: '2rem',
		paddingLeft: '2rem',
		borderStyle: 'solid',
	},
	variants: {
		contentBelow: {
			true: { flexDirection: { base: 'column' } },
			false: { flexDirection: { base: 'column-reverse' } },
		},
		contentLeft: {
			true: { flexDirection: { lg: 'row-reverse' } },
			false: { flexDirection: { lg: 'row' } },
		},
		surface: {
			none: {},
			canvas: { backgroundColor: 'canvas' },
			inset: { backgroundColor: 'inset' },
			surface: { backgroundColor: 'surface' },
			elevated: { backgroundColor: 'elevated' },
			overlay: { backgroundColor: 'overlay' },
		},
		structure: {
			none: { borderWidth: '0' },
			subtle: { borderWidth: 'md', borderColor: 'structure.subtle', borderRadius: 'lg' },
			default: { borderWidth: 'md', borderColor: 'structure.default', borderRadius: 'lg' },
			strong: { borderWidth: 'md', borderColor: 'structure.strong', borderRadius: 'lg' },
		},
	},
	defaultVariants: {
		contentBelow: false,
		contentLeft: false,
		surface: 'none',
		structure: 'none',
	},
});

const styles = {
	imageBlock: css({
		width: { base: '100%', lg: '66.666667%' },
	}),
	images: css({
		position: 'relative',
		width: '100%',
		height: '100%',
	}),
	textBlock: css({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: { base: '100%', lg: '41.666667%' },
	}),
};

/**
 * Two-column panel with an image and a text block. Supports responsive image swapping,
 * flexible content positioning, and colored title variants.
 *
 * @example
 * // Card mode with border
 * <ImagePanel
 *   as="card"
 *   surface="surface"
 *   structure="subtle"
 *   title="Our Story"
 *   image={{ src: '/hero.jpg', alt: 'Hero' }}
 * />
 *
 * // Full-bleed section stripe
 * <ImagePanel
 *   as="section"
 *   surface="inset"
 *   title="Our Story"
 *   image={{ src: '/hero.jpg', alt: 'Hero' }}
 * />
 */
export const ImagePanel = ({
	title,
	subtitle,
	contents,
	image,
	smImage,
	contentBelow = false,
	contentLeft = false,
	titleColor = 'standard',
	as = 'card',
	surface = 'none',
	structure = 'none',
}: ImagePanelProps) => {
	const isSection = as === 'section';

	const content = (
		<div
			className={panelStyles({
				contentBelow,
				contentLeft,
				surface: isSection ? 'none' : surface,
				structure: isSection ? 'none' : structure,
			})}
		>
			<div className={styles.imageBlock}>
				<div className={styles.images}>{renderPanelImage(image, smImage)}</div>
			</div>
			<div className={styles.textBlock}>
				<div>
					<Title color={titleColor}>
						{title}
						{subtitle && <Subtitle>{subtitle}</Subtitle>}
					</Title>
					{contents?.map((txt, _) => (
						<Text key={_}>{txt}</Text>
					))}
				</div>
			</div>
		</div>
	);

	if (isSection) {
		return <section className={sectionWrapper({ surface })}>{content}</section>;
	}

	return content;
};
