import React, { CSSProperties } from 'react';
import { ColumnSkeleton, renderImage } from '../../internal-components';
import { ColumnLayoutProps, ColumnItem } from './column-layout.types';
import { useResponsiveStyles } from '../../utils';
import { H2, H3, Subtitle, Text } from '../typography';

/**
 * A layout component that displays content in a responsive column grid.
 *
 * @component
 * @param {string} title - Optional title displayed at the top of the layout
 * @param {string} caption - Optional caption displayed below the title
 * @param {number} mdcol - Number of columns to display at medium viewport sizes
 * @param {number} lgcol - Number of columns to display at large viewport sizes
 * @param {ColumnItem[]} items - Array of items to display in the grid
 * @returns {JSX.Element} The column layout component
 */
export const ColumnLayout = ({ title, caption, mdcol, lgcol, items }: ColumnLayoutProps) => {
	const styles: Record<string, CSSProperties> = {
		section: {
			width: '100%',
			marginRight: 'auto',
			marginLeft: 'auto',
			maxWidth: useResponsiveStyles({ sm: 'none', md: mdcol < 2 ? '800px' : 'none', lg: 'none' }),
			paddingRight: '2rem',
			paddingLeft: '2rem',
			paddingTop: useResponsiveStyles({ sm: '2.5rem', md: '2rem', lg: '1.5rem' }),
			paddingBottom: useResponsiveStyles({ sm: '2.5rem', md: '2rem', lg: '1.5rem' }),
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			flex: useResponsiveStyles({ sm: '1 1 0%', lg: 'none' }),
		},
		gridItem: {
			borderRadius: '0.25rem',
			marginBottom: '1.5rem',
			width: '100%',
			height: 'auto',
			overflow: 'hidden',
		},
		gridPhoto: {
			width: '100%',
			height: 'auto',
			borderRadius: '0.25rem',
		},
	};
	return (
		<section style={styles.section}>
			{(title || caption) && (
				<div>
					{title && (
						<>
							<H2>
								{title}
								{caption && <Text>{caption}</Text>}
							</H2>
						</>
					)}
				</div>
			)}
			<ColumnSkeleton mdcol={mdcol || 2} lgcol={lgcol || 4}>
				{items.map((item, index) => (
					<div key={index}>
						<div style={styles.gridItem}>{renderImage(item.content, styles.gridPhoto)}</div>
						{(item.title || item.description) && (
							<>
								{item.title && <H3>{item.title}</H3>}
								{item.description && <Text>{item.description}</Text>}
							</>
						)}
					</div>
				))}
			</ColumnSkeleton>
		</section>
	);
};
