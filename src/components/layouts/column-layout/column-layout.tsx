import { renderImage } from '@/internal-components';
import { ColumnSkeleton } from './column-skeleton';
import { ColumnLayoutProps } from './column-layout.types';
import { H2, H3, Text } from '@/components';
import { css } from '@/styled-system/css';

/**
 * A layout component that displays content in a responsive column grid with optional title and caption.
 */
export const ColumnLayout = ({ title, caption, mdcol = 2, lgcol = 4, items }: ColumnLayoutProps) => {
	const sectionStyles = css({
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
		maxWidth: {
			base: 'none',
			md: 'var(--max-width, none)',
			lg: 'none',
		},
		paddingRight: '2rem',
		paddingLeft: '2rem',
		paddingTop: { base: '2.5rem', md: '2rem', lg: '1.5rem' },
		paddingBottom: { base: '2.5rem', md: '2rem', lg: '1.5rem' },
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		flex: { base: '1 1 0%', lg: 'none' },
	});

	const gridItemStyles = css({
		borderRadius: '0.25rem',
		marginBottom: '1.5rem',
		width: '100%',
		height: 'auto',
		overflow: 'hidden',
	});

	const gridPhotoStyles = css({
		width: '100%',
		height: 'auto',
		borderRadius: '0.25rem',
	});

	return (
		<section
			className={sectionStyles}
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
					<div key={index}>
						<div className={gridItemStyles}>{renderImage(item.content, undefined, gridPhotoStyles)}</div>
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
