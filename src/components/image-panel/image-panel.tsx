import React from 'react';
import { ImagePanelProps } from './image-panel.types';
import { renderImage } from '../../internal-components';
import { Subtitle, Text, Title } from '../typography';
import { CSSProperties } from 'react';
import { useResponsiveStyles } from '../../utils';
import { ImageProps } from '../../types';

// const renderPanelImage = (image: ImageProps, smImage?: ImageProps) => {
// 	const styles: Record<string, CSSProperties> = {
// 		smImage: {
// 			position: 'relative',
// 			display: useResponsiveStyles({ sm: 'none', lg: 'block' }),
// 			borderRadius: '0.25rem',
// 		},
// 		standardImage: {
// 			width: '100%',
// 			height: '100%',
// 			borderRadius: '0.25rem',
// 		},
// 		image: {
// 			display: useResponsiveStyles({ sm: 'block', lg: 'none' }),
// 			marginLeft: useResponsiveStyles({ sm: '0', md: 'auto' }),
// 			marginRight: useResponsiveStyles({ sm: '0', md: 'auto' }),
// 		},
// 	};
// 	const lgImage = renderImage(image);
// 	const smallImage = renderImage(image);

//     const minImage = React.cloneElement(lgImage, {
//         style: {
//             ...lgImage.props.style,

//         }
//     })

// 	return (
// 		<>
// 			{renderImage(image)}
// 			{smImage && renderImage(smImage)}
// 		</>
// 	);
// };

export const ImagePanel = ({ title, subtitle, contents, image, smImage, contentBelow, contentLeft }: ImagePanelProps) => {
	const styles: Record<string, CSSProperties> = {
		container: {
			display: 'flex',
			flexDirection: useResponsiveStyles({ sm: 'column-reverse', lg: 'row' }),
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
			<div style={styles.imageBlock}>{renderImage(image)} </div>
			<div style={styles.textBlock}>
				<div>
					<Title inline>I'm Andrew!</Title>
					<Text>
						I'm a Master of Information Systems Managment Student at BYU interested in software development. I love serving
						and getting to know people and using technology to create powerful solutions. I love music and music history
						and am an avid cook and baker. Thanks for visiting my site!
					</Text>
				</div>
			</div>
		</div>
	);
};
