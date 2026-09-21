import { FormLabel } from '../form-label';
import { TextInputProps } from './text-input.types';
import { InputWrapper } from '../input-wrapper';
import { baseInputStyles } from '../styles';
import { cx, css } from '@/styled-system/css';

const style = css({
	minHeight: '25',
	resize: 'vertical',
});

/**
 * Text input that renders either a single-line `input` or a resizable `textarea`.
 *
 * @example
 * <TextInput name="bio" title="Bio" value={bio} multiline onChange={handleChange} />
 */
export const TextInput = ({
	name,
	id = name,
	title,
	value,
	required,
	placeholder,
	multiline = false,
	type = 'text',
	size = 'md',
	disabled,
	onChange,
}: TextInputProps) => {
	return (
		<InputWrapper>
			{title && <FormLabel id={id} name={name} title={title} size={size} />}
			{multiline ? (
				<textarea
					id={id}
					name={name}
					required={required}
					disabled={disabled}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					rows={3}
					className={cx(baseInputStyles({ size }), style)}
				/>
			) : (
				<input
					type={type}
					id={id}
					name={name}
					required={required}
					disabled={disabled}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={baseInputStyles({ size })}
				/>
			)}
		</InputWrapper>
	);
};
