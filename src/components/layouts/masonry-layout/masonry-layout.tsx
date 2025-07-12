import { H3, Subtitle } from '@/components';
import { MasonryLayoutProps } from './masonry-layout.types';
import { container } from '@/styled-system/patterns';
import { css, cx } from '@/styled-system/css';

export const MasonryLayout = ({ title, caption, components }: MasonryLayoutProps) => {
	const styles = {
		container: cx(container()),
		list: css({
			marginTop: '8px',
			columnCount: { base: 2, md: 3, lg: 4 },
			columnGap: '8px',
		}),
		item: css({
			width: '100%',
			display: 'inline-block',
			borderRadius: '4px',
			overflow: 'hidden',
		}),
	};
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
