import { css } from '@/styled-system/css';
import { ReactNode } from 'react';

export const InputWrapper = ({ children }: { children: ReactNode }) => {
	const styles = css({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		padding: '4px',
	});
	return <div className="flex flex-col justify-start items-center w-full p-1">{children}</div>;
};
