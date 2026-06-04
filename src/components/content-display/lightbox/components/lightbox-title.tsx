'use client';
import { ReactNode } from 'react';
import { useLightboxContext } from '../lightbox-context';
import { H2 } from '@/components/typography';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';

const styles = {
	container: css({
		width: '100%',
		display: 'flex',
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '4',
	}),
};

export const LightboxTitle = () => {
	const { title, onClose } = useLightboxContext();

	const titleDisplay: ReactNode = typeof title === 'string' ? <H2 inline>{title}</H2> : title;

	return (
		<div className={styles.container}>
			<IconButton
				ariaLabel="Close modal"
				onClick={onClose}
				color="text"
				size={'sm'}
				name="X"
			/>
			{titleDisplay}
		</div>
	);
};
