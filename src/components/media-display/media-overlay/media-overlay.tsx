import { css, cva } from '@/styled-system/css';
import { MediaOverlayProps } from './media-overlay.types';
import type { ThreadCssName } from '@/theme/css-name-configurations/theme-css-names';

const MAX_HEIGHT_CSS_NAME: ThreadCssName = '--thread-media-overlay-max-height';
const MAX_WIDTH_CSS_NAME: ThreadCssName = '--thread-media-overlay-max-width';

const styles = {
	root: cva({
		base: {
			position: 'relative',
			overflow: 'hidden',
			borderRadius: 'inherit',
			_hover: {
				'& [data-overlay]': {
					opacity: 1,
				},
			},
		},
		variants: {
			fit: {
				contain: {
					'& > :first-child': {
						display: 'block',
						width: '100%',
						height: '100%',
					},
				},
				fill: {
					display: 'inline-flex',
					height: '100%',
					maxWidth: '100%',
					maxHeight: '100%',
				},
			},
		},
		defaultVariants: {
			fit: 'contain',
		},
	}),
	overlay: cva({
		base: {
			position: 'absolute',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			padding: 'md',
			opacity: 0,
			transition: 'opacity 200ms ease',
			color: 'white',
			borderRadius: 'inherit',
			maxHeight: 'var(--thread-media-overlay-max-height, 100%)',
			maxWidth: 'var(--thread-media-overlay-max-width, 100%)',
			overflow: 'hidden',
		},
		variants: {
			scrimLevel: {
				none: { background: 'transparent' },
				light: { background: 'scrim.light' },
				medium: { background: 'scrim.medium' },
				heavy: { background: 'scrim.heavy' },
			},
			placement: {
				full: { inset: 0 },
				top: { top: 0, left: 0, right: 0 },
				bottom: { bottom: 0, left: 0, right: 0 },
				left: { top: 0, bottom: 0, left: 0 },
				right: { top: 0, bottom: 0, right: 0 },
			},
		},
		defaultVariants: {
			placement: 'full',
		},
	}),
};

/**
 * Renders an overlay layer on top of arbitrary media, with a configurable scrim, placement, and size caps.
 *
 * @example
 * <MediaOverlay
 *   scrimLevel="medium"
 *   placement="bottom"
 *   maxHeight="50%"
 *   overlay={<Title>Caption</Title>}
 * >
 *   <img src="/photo.jpg" alt="Photo" />
 * </MediaOverlay>
 */
export const MediaOverlay = ({
	children,
	overlay,
	scrimLevel = 'medium',
	placement,
	fit = 'contain',
	maxHeight,
	maxWidth,
}: MediaOverlayProps) => {
	return (
		<div className={styles.root({ fit })}>
			{children}
			<div
				data-overlay
				className={styles.overlay({ scrimLevel, placement })}
				style={
					{
						...(maxHeight ? { [MAX_HEIGHT_CSS_NAME]: maxHeight } : {}),
						...(maxWidth ? { [MAX_WIDTH_CSS_NAME]: maxWidth } : {}),
					} as React.CSSProperties
				}
			>
				{overlay}
			</div>
		</div>
	);
};
