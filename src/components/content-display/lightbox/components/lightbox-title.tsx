'use client';
import { useLightboxContext } from '../lightbox-context';
import { H2, Text } from '@/components/typography';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';
import { ContentHeader } from '@/internal-components';

const styles = {
	titleBlock: css({
		width: '100%',
		marginBottom: '4',
	}),
};

export const LightboxTitle = () => {
	const { title, subtitle, onClose } = useLightboxContext();

	const titleDisplay =
		typeof title === 'string' ? (
			<H2 subtitle={subtitle} color="inverted" inline>
				{title}
			</H2>
		) : (
			title
		);

	return (
		<ContentHeader
			className={styles.titleBlock}
			title={titleDisplay}
			secondaryContent={
				<IconButton
					ariaLabel="Close modal"
					onClick={onClose}
					color="neutral"
					size={'sm'}
					name="X"
				/>
			}
		/>
	);
};
