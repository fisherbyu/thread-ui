import { css } from '@/styled-system/css';
import { ReactNode } from 'react';

const styles = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
	paddingBottom: '4px',
});

export const InputWrapper = ({ children }: { children: ReactNode }) => {
	return <div className={styles}>{children}</div>;
};
