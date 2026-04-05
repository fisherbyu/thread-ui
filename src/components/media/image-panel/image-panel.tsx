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
			canvas: { backgroundColor: 'canvas', borderRadius: 'lg', padding: '1.5rem' },
			inset: { backgroundColor: 'inset', borderRadius: 'lg', padding: '1.5rem' },
			surface: { backgroundColor: 'surface', borderRadius: 'lg', padding: '1.5rem' },
			elevated: { backgroundColor: 'elevated', borderRadius: 'lg', padding: '1.5rem' },
			overlay: { backgroundColor: 'overlay', borderRadius: 'lg', padding: '1.5rem' },
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
 * <ImagePanel
 *   title="Our Story"
 *   subtitle="How it started"
 *   contents={['Founded in 2020...', 'We believe in...']}
 *   image={{ src: '/hero.jpg', alt: 'Hero' }}
 *   smImage={{ src: '/hero-sm.jpg', alt: 'Hero' }}
 *   contentLeft
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
	surface = 'none',
	structure = 'none',
}: ImagePanelProps) => {
	return (
		<div className={panelStyles({ contentBelow, contentLeft, surface, structure })}>
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
};
