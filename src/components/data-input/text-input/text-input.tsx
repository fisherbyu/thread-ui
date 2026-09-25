'use client';
import { TextInputProps } from './text-input.types';
import { InputWrapper } from '../shared/input-wrapper';
import { useFieldError } from '../shared/use-field-error';
import { useInputId } from '../shared/use-input-id';
import { baseInputStyles } from '../shared/styles';
import { cx, css } from '@/styled-system/css';

const style = css({
	minHeight: '25',
	resize: 'vertical',
});

/**
 * Text input that renders either a single-line `input` or a resizable `textarea`.
 * Controlled when `value` is passed, uncontrolled otherwise.
 * Omit `name` to keep the value out of form submission, e.g. for a search bar.
 *
 * @example
 * <TextInput name="bio" title="Bio" value={bio} multiline onChange={handleChange} />
 *
 * @example
 * <TextInput name="bio" title="Bio" defaultValue={artist.bio} multiline />
 *
 * @example
 * <TextInput name="email" title="Email" type="email" required error={emailError} />
 */
export const TextInput = ({
	name,
	id: idProp,
	title,
	value,
	defaultValue,
	required,
	placeholder,
	multiline = false,
	type = 'text',
	size = 'md',
	disabled,
	divider,
	error,
	onChange,
}: TextInputProps) => {
	const id = useInputId(idProp, name);

	// Pass only one of the two so the element never flips between modes
	const valueProps = value !== undefined ? { value } : { defaultValue };

	const { ref, message, fieldProps } = useFieldError<HTMLInputElement | HTMLTextAreaElement>({
		id,
		error,
		value,
	});

	return (
		<InputWrapper id={id} title={title} size={size} divider={divider} error={message}>
			{multiline ? (
				<textarea
					ref={ref}
					id={id}
					name={name}
					required={required}
					disabled={disabled}
					{...valueProps}
					onChange={onChange}
					placeholder={placeholder}
					rows={3}
					className={cx(baseInputStyles({ size }), style)}
					{...fieldProps}
				/>
			) : (
				<input
					ref={ref}
					type={type}
					id={id}
					name={name}
					required={required}
					disabled={disabled}
					{...valueProps}
					onChange={onChange}
					placeholder={placeholder}
					className={baseInputStyles({ size })}
					{...fieldProps}
				/>
			)}
		</InputWrapper>
	);
};
