import { css } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { H3 } from '@/components/typography';

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
