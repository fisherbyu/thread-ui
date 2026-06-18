import { css } from '@/styled-system/css';
import { ImageOverlayProps } from './image-overlay.types';

const styles = {
	root: css({
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 'inherit',
		'& img': {
			display: 'block',
			width: '100%',
			height: '100%',
		},
	}),
	overlay: css({
		background: 'scrim',
		position: 'absolute',
		inset: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		padding: 'md',
		opacity: 0,
		transition: 'opacity 200ms ease',
		color: 'white',
		borderRadius: 'inherit',
		_hover: {
			opacity: 1,
		},
	}),
};

export const ImageOverlay = ({ children, overlay }: ImageOverlayProps) => {
	return (
		<div className={styles.root}>
			{children}
			<div className={styles.overlay}>{overlay}</div>
		</div>
	);
};
