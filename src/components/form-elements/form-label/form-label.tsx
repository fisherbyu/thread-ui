import { css } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { H3 } from '@/components/typography';

export const FormLabel = ({ name, id = name, title }: FormLabelProps) => {
	const styles = css({
		display: 'block',
		alignSelf: 'flex-start',
		marginBottom: '8px',
	});
	return (
		<label id={id} htmlFor={name} className="block self-start font-medium text-gray-700 mb-2">
			<H3>{title}</H3>
		</label>
	);
};
