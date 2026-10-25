'use client';
import { useState } from 'react';
import { css, cva } from '@/styled-system/css';
import { MediaOverlayProps } from './media-overlay.types';
import type { ThreadCssName } from '@/theme/css-name-configurations/theme-css-names';

const MAX_HEIGHT_CSS_NAME: ThreadCssName = '--thread-media-overlay-max-height';
const MAX_WIDTH_CSS_NAME: ThreadCssName = '--thread-media-overlay-max-width';

const styles = {
	frame: css({
		width: '100%',
		height: '100%',
		containerType: 'size',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'inherit',
	}),
	root: css({
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 'inherit',
		'& > :first-child': {
			display: 'block',
			width: '100%',
			height: '100%',
		},
		'&:focus-within [data-overlay]': {
			opacity: 1,
		},
		// Touch screens keep :hover after a tap, toggle on tap instead
		'@media (hover: hover)': {
			'&:hover [data-overlay]': {
				opacity: 1,
			},
		},
		'@media (hover: none)': {
			'&[data-revealed] [data-overlay]': {
				opacity: 1,
			},
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
 * The media fills the overlay's box; with `aspectRatio`, the box is fitted inside the parent at that ratio.
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
	maxHeight,
	maxWidth,
	aspectRatio,
}: MediaOverlayProps) => {
	const [revealed, setRevealed] = useState(false);

	const content = (
		<div
			className={styles.root}
			style={
				aspectRatio
					? { aspectRatio, width: `min(100cqw, calc(100cqh * ${aspectRatio}))` }
					: undefined
			}
			data-revealed={revealed || undefined}
			onClick={() => setRevealed((open) => !open)}
		>
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

	return aspectRatio ? <div className={styles.frame}>{content}</div> : content;
};
