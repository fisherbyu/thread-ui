import { css, cva } from '@/styled-system/css';
import { UtilitySizeOptions } from '@/types';
import { ReactNode } from 'react';
import { getErrorId } from './use-field-error';

const styles = {
	wrapper: css({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		alignItems: 'center',
		width: '100%',
	}),
	message: cva({
		base: {
			alignSelf: 'flex-start',
			color: 'error.main',
			_empty: { marginTop: '0' },
		},
		variants: {
			size: {
				sm: { fontSize: 'xs', marginTop: '1' },
				md: { fontSize: 'sm', marginTop: '1.5' },
				lg: { fontSize: 'md', marginTop: '2' },
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}),
};

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

/**
 * Column layout for a form control with its label and error message.
 * The message slot is an always-present `aria-live` region so screen readers announce changes.
 *
 * @example
 * <InputWrapper id={id} error={message} size={size}>
 *   <FormLabel id={id} name={name} title={title} size={size} />
 *   <input id={id} name={name} />
 * </InputWrapper>
 */
export const InputWrapper = ({ children, id, error, size = 'md' }: InputWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			{children}
			{id && (
				<div id={getErrorId(id)} aria-live="polite" className={styles.message({ size })}>
					{error}
				</div>
			)}
		</div>
	);
};
