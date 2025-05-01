'use client';
import { ImagePanelProps } from './image-panel.types';
import { renderImage } from '../../internal-components';
import { Subtitle, Text, Title } from '../typography';
import { CSSProperties } from 'react';
import { useResponsiveStyles } from '../../utils';
import { ImageProps } from '../../types';

const renderPanelImage = (image: ImageProps, smImage?: ImageProps) => {
	const styles: Record<string, CSSProperties> = {
		smImage: {
			position: 'relative',
			display: useResponsiveStyles({ sm: 'block', lg: 'none' }),
			borderRadius: '0.25rem',
		},
		standardImg: {
			width: '100%',
			height: '100%',
			borderRadius: '0.25rem',
		},
		image: {
			display: useResponsiveStyles({ sm: 'none', lg: 'block' }),
			marginLeft: useResponsiveStyles({ sm: '0', md: 'auto' }),
			marginRight: useResponsiveStyles({ sm: '0', md: 'auto' }),
		},
	};

	if (smImage) {
		return (
			<>
				{renderImage(smImage, { ...styles.smImage, ...styles.standardImg })}
				{renderImage(image, { ...styles.image, ...styles.standardImg })}
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
}: ImagePanelProps) => {
	const styles: Record<string, CSSProperties> = {
		container: {
			display: 'flex',
			flexDirection: useResponsiveStyles({
				sm: contentBelow ? 'column' : 'column-reverse',
				lg: contentLeft ? 'row-reverse' : 'row',
			}),
			gap: useResponsiveStyles({ sm: '12px', lg: '20px' }),
			justifyContent: 'center',
			alignItems: 'stretch',
			width: '100%',
			marginRight: 'auto',
			maxWidth: ' 1400px',
			marginLeft: 'auto',
			paddingRight: '2rem',
			paddingLeft: '2rem',
		},
		imageBlock: {
			width: useResponsiveStyles({ sm: '', lg: '66.666667%' }),
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
			width: useResponsiveStyles({ sm: '100%', lg: '41.666667%' }),
		},
	};
	return (
		<div style={styles.container}>
			<div style={styles.imageBlock}>{renderPanelImage(image, smImage)}</div>
			<div style={styles.textBlock}>
				<div>
					<Title inline>
						{title}
						{subtitle && <Subtitle>{subtitle}</Subtitle>}
					</Title>
					{contents?.map((txt) => <Text>{txt}</Text>)}
				</div>
			</div>
		</div>
	);
};
