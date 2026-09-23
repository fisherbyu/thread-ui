import { css } from '@/styled-system/css';
import { UtilitySizeOptions } from '@/types';
import { ReactNode } from 'react';

const styles = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'center',
	width: '100%',
});

/** Props for `InputWrapper`. */
type InputWrapperProps = {
	children: ReactNode;
	/** Id of the wrapped control; enables the error message slot when provided */
	id?: string;
	/** Message rendered below the control */
	error?: string | null;
	/** Size @default `md` */
	size?: UtilitySizeOptions;
};

export const InputWrapper = ({ children }: { children: ReactNode }) => {
	return <div className={styles}>{children}</div>;
};
