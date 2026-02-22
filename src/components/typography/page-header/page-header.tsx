import { css, cva, cx } from '@/styled-system/css';
import { PageHeaderProps } from './page-header.types';
import { container } from '@/styled-system/patterns';
import { Divider, Subtitle, Title } from '@/components';

/**
 * Page-level header with a title, optional caption, and a divider.
 *
 * @example
 * <PageHeader title="Our Team" caption="Meet the people behind the product." center />
 */
export const PageHeader = ({ title, caption, center }: PageHeaderProps) => {
	const styles = {
		container: cx(
			container(),
			css({
				marginY: '20px',
			})
		),
		caption: css({
			width: { md: '50%' },
			paddingX: { md: '8px' },
			marginX: 'auto',
		}),
		spacer: css({
			display: 'inline-block',
			marginRight: '32px',
		}),
	};
	return (
		<div className={styles.container}>
			<Title align="center" inline>
				{title}
			</Title>
			{caption && (
				<>
					<br />
					<div className={styles.caption}>
						<Subtitle align={center ? 'center' : 'left'}>
							{!center && <span className={styles.spacer}></span>}
							{caption}
						</Subtitle>
					</div>
				</>
			)}
			<Divider width="33%" />
		</div>
	);
};
