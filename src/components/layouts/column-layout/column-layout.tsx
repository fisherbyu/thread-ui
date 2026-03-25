import { renderImage } from '@/internal-components';
import { ColumnSkeleton } from './column-skeleton';
import { ColumnLayoutProps } from './column-layout.types';
import { H2, H3, Text } from '@/components';
import { css } from '@/styled-system/css';
import { LayoutWrapper } from '../layout-wrapper';

const styles = {
	section: css({
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
		maxWidth: {
			base: 'none',
			md: 'var(--max-width, none)',
			lg: 'none',
		},
		paddingTop: { base: '2.5rem', md: '2rem', lg: '1.5rem' },
		paddingBottom: { base: '2.5rem', md: '2rem', lg: '1.5rem' },
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		flex: { base: '1 1 0%', lg: 'none' },
	}),
	gridItem: css({
		borderRadius: '0.25rem',
		marginBottom: '1.5rem',
		width: '100%',
		height: 'auto',
		overflow: 'hidden',
		minWidth: '0',
	}),
	gridItemContent: css({
		width: '100%',
		height: 'auto',
		borderRadius: '0.25rem',
	}),
};

/**
 * Responsive image grid with an optional title and caption.
 * Column count is controlled separately for medium and large viewports.
 *
 * @example
 * <ColumnLayout
 *   title="Our Work"
 *   mdcol={2}
 *   lgcol={4}
 *   items={[{ content: { src: '/img.jpg', alt: 'Example' }, title: 'Item' }]}
 * />
 */
export const ColumnLayout = ({
	title,
	caption,
	mdcol,
	lgcol = mdcol,
	items,
	container = true,
}: ColumnLayoutProps) => {
	return (
		<LayoutWrapper container={container}>
			<section
				className={styles.section}
				style={
					{
						'--max-width': mdcol < 2 ? '800px' : 'none',
					} as React.CSSProperties
				}
			>
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
				<ColumnSkeleton mdcol={mdcol} lgcol={lgcol}>
					{items.map((item, index) => (
						<div key={item.key ?? index}>
							<div className={styles.gridItem}>
								{renderImage(item.content, undefined, styles.gridItemContent)}
							</div>
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
		</LayoutWrapper>
	);
};
