import { css, cva } from '@/styled-system/css';
import { MediaOverlayProps } from './media-overlay.types';

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
	overlay: cva({
		base: {
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
		},
		variants: {
			scrimLevel: {
				none: { background: 'transparent' },
				light: { background: 'scrim.light' },
				medium: { background: 'scrim.medium' },
				heavy: { background: 'scrim.heavy' },
			},
		},
	}),
};

export const MediaOverlay = ({ children, overlay, scrimLevel }: MediaOverlayProps) => {
	return (
		<div className={styles.root}>
			{children}
			<div className={styles.overlay({ scrimLevel })}>{overlay}</div>
		</div>
	);
};
