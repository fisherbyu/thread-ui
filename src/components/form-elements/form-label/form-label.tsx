import { css, cva } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { H3, Text } from '@/components/typography';
import { ExpandedUtilitySizeOptions, UtilitySizeOptions } from '@/types';

/**
 * Form label linked to a control by `name`. Renders as an `H3` typographic style.
 *
 * @example
 * <FormLabel name="email" title="Email Address" />
 */
export const FormLabel = ({ name, id = name, title, size = 'md' }: FormLabelProps) => {
	const styles = cva({
		base: {
			display: 'block',
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

	const textSizeFromSizeProp = (() => {
		switch (size) {
			case 'sm':
				return 'md';
			case 'md':
				return 'lg';
			case 'lg':
				return 'xl';
			default:
				return 'lg';
		}
	})();

	return (
		<label id={id} htmlFor={name} className={styles({ size })}>
			<Text bold size={textSizeFromSizeProp}>
				{title}
			</Text>
		</label>
	);
};
