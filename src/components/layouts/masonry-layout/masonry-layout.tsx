'use client';
import { CONTAINER_STYLES } from '@/defaults';
import { useThreadStyleObjects } from '@/functions';
import { H3, Subtitle } from '@/components';
import { MasonryLayoutProps } from './masonry-layout.types';

export const MasonryLayout = ({ title, caption, components }: MasonryLayoutProps) => {
	const styles = useThreadStyleObjects({
		container: CONTAINER_STYLES,
		list: {
			marginTop: '8px',
			columnCount: { sm: 2, md: 3, lg: 4 },
			columnGap: '8px',
		},
		item: {
			width: '100%',
			display: 'inline-block',
			borderRadius: '4px',
			overflow: 'hidden',
		},
	});
	return (
		<section className={styles.container}>
			{title && (
				<H3>
					{title}
					{caption && <Subtitle>{caption}</Subtitle>}
				</H3>
			)}
			<div>
				<ol className={styles.list}>
					{components.map((component, index) => (
						<li key={index} className={styles.item}>
							{component}
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};
