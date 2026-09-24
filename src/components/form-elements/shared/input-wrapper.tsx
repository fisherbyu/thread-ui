import { css, cva } from '@/styled-system/css';
import { Override, Prettify } from '@/types';
import { ReactNode } from 'react';
import { Divider } from '@/components/ui';
import { BaseInputProps } from './input-props.types';
import { FormLabel } from './form-label';
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
	srOnly: css({ srOnly: true }),
};

/** Props for `InputWrapper`. */
type InputWrapperProps = Prettify<
	Pick<
		Override<
			BaseInputProps,
			{
				/** Id of the wrapped control; the label points to it and the message id derives from it */
				id: string;
			}
		>,
		'id' | 'title' | 'size' | 'divider'
	> & {
		children: ReactNode;
		/** Message rendered below the control */
		error?: string | null;
		/** Keep the label for screen readers but hide it visually */
		hideLabel?: boolean;
	}
>;

/**
 * Field shell for a form control: label, optional divider, the control, and the error message.
 * The message slot is an always-present `aria-live` region so screen readers announce changes.
 *
 * @example
 * <InputWrapper id={id} title={title} size={size} error={message}>
 *   <input id={id} name={name} />
 * </InputWrapper>
 *
 * @example
 * <InputWrapper id={id} title="Filters" hideLabel divider>
 *   <button id={id}>Open</button>
 * </InputWrapper>
 */
export const InputWrapper = ({
	children,
	id,
	title,
	size = 'md',
	divider,
	hideLabel,
	error,
}: InputWrapperProps) => {
	const label = title && <FormLabel id={id} title={title} size={size} />;

	return (
		<div className={styles.wrapper}>
			{label && (hideLabel ? <div className={styles.srOnly}>{label}</div> : label)}
			{divider && <Divider width="100%" marginY="2px" />}
			{children}
			<div id={getErrorId(id)} aria-live="polite" className={styles.message({ size })}>
				{error}
			</div>
		</div>
	);
};
