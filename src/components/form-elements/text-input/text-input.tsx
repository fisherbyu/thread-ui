import { FormLabel } from '../form-label';
import { TextInputProps } from './text-input.types';
import { InputWrapper } from '../input-wrapper';
import { baseInputStyles } from '../styles';
import { cx, css } from '@/styled-system/css';

export const TextInput = ({
	name,
	id = name,
	title,
	value,
	required,
	placeholder,
	multiline = false,
	onChange,
}: TextInputProps) => {
	const style = css({
		minHeight: '25',
		resize: 'vertical',
	});

	return (
		<InputWrapper>
			{title && <FormLabel id={id} name={name} title={title} />}
			{multiline ? (
				<textarea
					id={id}
					name={name}
					required={required}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					rows={3}
					className={cx(baseInputStyles(), style)}
				/>
			) : (
				<input
					type="text"
					id={id}
					name={name}
					required={required}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={baseInputStyles()}
				/>
			)}
		</InputWrapper>
	);
};
