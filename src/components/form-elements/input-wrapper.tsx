import { css } from '@/styled-system/css';
import { ReactNode } from 'react';

export const InputWrapper = ({ children }: { children: ReactNode }) => {
	const styles = css({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		alignItems: 'center',
		width: '100%',
		paddingBottom: '4px',
	});

	return <div className={styles}>{children}</div>;
};
