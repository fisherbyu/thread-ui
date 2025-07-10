'use client';
import { ImagePanelProps } from './image-panel.types';
import { renderImage } from '@/internal-components';
import { Subtitle, Text, Title } from '@/components';
import { ImageProps } from '@/types';
import { generateStyleObject } from '@/functions';

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
	const styles = generateStyleObject({
		container: {
			display: 'flex',
			flexDirection: {
				sm: contentBelow ? 'column' : 'column-reverse',
				lg: contentLeft ? 'row-reverse' : 'row',
			},
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
		imageBlock: {
			width: { sm: '', lg: '66.666667%' },
		},
		images: {
			position: 'relative',
			width: '100%',
			height: '100%',
		},
		textBlock: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 'auto',
			marginRight: 'auto',
			width: { sm: '100%', lg: '41.666667%' },
		},
	});

	return (
		<div className={styles.container}>
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
