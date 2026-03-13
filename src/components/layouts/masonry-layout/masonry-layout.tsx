import { H3, Subtitle } from '@/components';
import { MasonryLayoutProps } from './masonry-layout.types';
import { css } from '@/styled-system/css';
import { LayoutWrapper } from '../layout-wrapper';

const styles = {
	container: css({ width: 'full' }),
	list: css({
		marginTop: '2',
		columnCount: { base: 2, md: 3, lg: 4 },
		columnGap: '2',
	}),
	item: css({
		width: '100%',
		display: 'inline-block',
		borderRadius: 'sm',
		overflow: 'hidden',
	}),
};

/**
 * Masonry-style grid layout that arranges items into columns (2 on mobile, 3 on medium, 4 on large).
 *
 * @example
 * <MasonryLayout
 *   title="Gallery"
 *   components={images.map((img) => <img src={img.src} alt={img.alt} />)}
 * />
 */
export const MasonryLayout = ({ title, caption, items, container }: MasonryLayoutProps) => {
	return (
		<LayoutWrapper container={container}>
			<div className={styles.container}>
				{title && (
					<H3>
						{title}
						{caption && <Subtitle>{caption}</Subtitle>}
					</H3>
				)}
				<ol className={styles.list}>
					{items.map((component, index) => (
						<li key={index} className={styles.item}>
							{component}
						</li>
					))}
				</ol>
			</div>
		</LayoutWrapper>
	);
};
