import { ReactNode } from 'react';
import { ContentHeaderProps } from './content-header.types';
import { H2 } from '@/components';
import { css } from '@/styled-system/css';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	}),
	secondaryContent: css({
		marginLeft: 'auto',
	}),
};

export const ContentHeader = ({ title, subtitle, secondaryContent }: ContentHeaderProps) => {
	const titleDisplay: ReactNode =
		typeof title === 'string' ? (
			<H2 subtitle={subtitle} inline>
				{title}
			</H2>
		) : (
			title
		);

	if (typeof title !== 'string' && subtitle) {
		console.warn(
			'Thread UI - ContentHeader: `subtitle` prop is ignored when `title` is a ReactElement. ' +
				'Use the `subtitle` prop on your heading component directly.'
		);
	}

	if (!title && !secondaryContent) {
		return null;
	}

	return (
		<div className={styles.container}>
			{title && titleDisplay}
			{secondaryContent && <div className={styles.secondaryContent}>{secondaryContent}</div>}
		</div>
	);
};
