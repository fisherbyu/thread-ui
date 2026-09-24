import { cva } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { Text } from '@/components/typography';
import { Divider } from '@/components/ui';

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
 *
 * @example
 * <FormLabel id="email" title="Email Address" />
 */
export const FormLabel = ({ id, title, size = 'md', divider }: FormLabelProps) => {
	return (
		<label id={`${id}-label`} htmlFor={id} className={styles({ size })}>
			<Text inline weight="semibold" size={size}>
				{title}
			</Text>
			{divider && <Divider width="100%" marginY="2px" />}
		</label>
	);
};
