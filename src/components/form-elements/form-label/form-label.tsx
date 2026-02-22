import { css } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { H3 } from '@/components/typography';

/**
 * Form label linked to a control by `name`. Renders as an `H3` typographic style.
 *
 * @example
 * <FormLabel name="email" title="Email Address" />
 */
export const FormLabel = ({ name, id = name, title }: FormLabelProps) => {
	const styles = css({
		display: 'block',
		alignSelf: 'flex-start',
		marginBottom: '2',
	});

	return (
		<label id={id} htmlFor={name} className={styles}>
			<H3>{title}</H3>
		</label>
	);
};
