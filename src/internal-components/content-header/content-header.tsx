import { ReactNode } from 'react';
import { css } from '@/styled-system/css';
import { ContentHeaderProps } from './content-header.types';
import { H2 } from '@/components';

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

/**
 * Internal header component used by content and layout components to
 * render a consistent title region with an optional trailing slot.
 *
 * When `title` is a string it renders as an `H2` with the `subtitle`
 * prop applied. When `title` is a heading element the consumer owns
 * all heading rendering and the `subtitle` prop is ignored.
 *
 * Returns `null` when neither `title` nor `secondaryContent` is provided.
 */
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
