'use client';
import { ImagePanelProps } from './image-panel.types';
import { renderImage } from '@/internal-components';
import { Subtitle, Text, Title } from '@/components';
import { ImageProps } from '@/types';
import { generateStyleObject } from '@/functions';
import { css, cva } from '@/styled-system/css';

const renderPanelImage = (image: ImageProps, smImage?: ImageProps) => {
	const classes = generateStyleObject({
		smImage: {
			position: 'relative',
			display: { sm: 'block', lg: 'none' },
			borderRadius: '0.25rem',
		},
		standardImg: {
			width: '100%',
			height: '100%',
			borderRadius: '0.25rem',
		},
		image: {
			display: { sm: 'none', lg: 'block' },
			marginLeft: { sm: '0', md: 'auto' },
			marginRight: { sm: '0', md: 'auto' },
		},
	});

	if (smImage) {
		return (
			<>
				{renderImage(smImage, undefined, `${classes.smImage} ${classes.standardImg}`)}
				{renderImage(image, undefined, `${classes.image} ${classes.standardImg}`)}
			</>
		);
	} else {
		return renderImage(image);
	}
};

export const ImagePanel = ({
	title,
	subtitle,
	contents,
	image,
	smImage,
	contentBelow = false,
	contentLeft = false,
	titleColor = 'standard',
}: ImagePanelProps) => {
	const panelStyles = cva({
		base: {
			display: 'flex',
			gap: { sm: '12px', lg: '20px' },
			justifyContent: 'center',
			alignItems: 'stretch',
			width: '100%',
			marginRight: 'auto',
			maxWidth: { sm: 'none', md: '800px', lg: '1400px' },
			marginLeft: 'auto',
			paddingRight: '2rem',
			paddingLeft: '2rem',
		},
		variants: {
			contentBelow: {
				true: { flexDirection: { sm: 'column' } },
				false: { flexDirection: { sm: 'column-reverse' } },
			},
			contentLeft: {
				true: { flexDirection: { lg: 'row-reverse' } },
				false: { flexDirection: { lg: 'row' } },
			},
		},
		defaultVariants: {
			contentBelow: false,
			contentLeft: false,
		},
	});
	const styles = {
		imageBlock: css({
			width: { sm: '', lg: '66.666667%' },
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
			width: { sm: '100%', lg: '41.666667%' },
		}),
	};

	return (
		<div className={panelStyles({ contentBelow, contentLeft })}>
			<div className={styles.imageBlock}>{renderPanelImage(image, smImage)}</div>
			<div className={styles.textBlock}>
				<div>
					<Title color={titleColor}>
						{title}
						{subtitle && <Subtitle>{subtitle}</Subtitle>}
					</Title>
					{contents?.map((txt, _) => <Text key={_}>{txt}</Text>)}
				</div>
			</div>
		</div>
	);
};
