import { cva } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { Text } from '@/components/typography';

const styles = cva({
	base: {
		display: 'block',
		width: '100%',
		alignSelf: 'flex-start',
	},
	variants: {
		size: {
			sm: {
				marginBottom: '1',
			},
			md: {
				marginBottom: '1.5',
			},
			lg: {
				marginBottom: '2',
			},
		},
	},
});

/**
 * Form label linked to a control by `id`. Renders as an `H3` typographic style.
 * Rendered by `InputWrapper`; use directly only for custom layouts.
 *
 * @example
 * <FormLabel id="email" title="Email Address" />
 */
export const FormLabel = ({ id, title, size = 'md' }: FormLabelProps) => {
	return (
		<label id={`${id}-label`} htmlFor={id} className={styles({ size })}>
			<Text inline weight="semibold" size={size}>
				{title}
			</Text>
		</label>
	);
};
