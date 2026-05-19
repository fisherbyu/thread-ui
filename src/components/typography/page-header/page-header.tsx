import { css, cva, cx } from '@/styled-system/css';
import { PageHeaderProps } from './page-header.types';
import { container } from '@/styled-system/patterns';
import { Divider, Subtitle, Title } from '@/components';

const styles = {
	container: cx(
		container(),
		css({
			marginY: '4',
		})
	),
	caption: css({
		width: { md: '50%' },
		paddingX: { md: '1' },
		marginX: 'auto',
		marginY: '4',
	}),
	spacer: css({
		display: 'inline-block',
		marginRight: '8',
	}),
};

/**
 * Page-level header with a title, optional caption, and a divider.
 *
 * @example
 * <PageHeader title="Our Team" caption="Meet the people behind the product." center />
 */
export const PageHeader = ({ title, caption, center }: PageHeaderProps) => {
	return (
		<div className={styles.container}>
			<Title align="center" inline>
				{title}
			</Title>
			{caption && (
				<>
					<div className={styles.caption}>
						<Subtitle
							indent={center ? false : true}
							fontFamily="heading"
							align={center ? 'center' : 'left'}
						>
							{caption}
						</Subtitle>
					</div>
				</>
			)}
			<Divider width="33%" />
		</div>
	);
};
