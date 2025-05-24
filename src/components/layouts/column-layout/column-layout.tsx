'use client';
import { ColumnSkeleton, renderImage } from '@/internal-components';
import { ColumnLayoutProps } from './column-layout.types';
import { H2, H3, Text } from '@/components';
import { makeStyleObject } from '@/functions';

/**
 * A layout component that displays content in a responsive column grid with optional title and caption.
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
	const styles = makeStyleObject({
		section: {
			width: '100%',
			marginRight: 'auto',
			marginLeft: 'auto',
			maxWidth: { sm: 'none', md: mdcol < 2 ? '800px' : 'none', lg: 'none' },
			paddingRight: '2rem',
			paddingLeft: '2rem',
			paddingTop: { sm: '2.5rem', md: '2rem', lg: '1.5rem' },
			paddingBottom: { sm: '2.5rem', md: '2rem', lg: '1.5rem' },
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			flex: { sm: '1 1 0%', lg: 'none' },
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
	});
	return (
		<section className={styles.section}>
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
						<div className={styles.gridItem}>{renderImage(item.content, undefined, styles.gridPhoto)}</div>
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
