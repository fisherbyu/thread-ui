import { css, cva } from '@/styled-system/css';
import { FormLabelProps } from './form-label.types';
import { Text } from '@/components/typography';
import { Divider } from '@/components/ui';

const styles = {
	root: cva({
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
	}),
	row: css({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '2',
	}),
	label: css({
		flex: '1',
		minWidth: '0',
	}),
};

/**
 * Form label linked to a control by `id`. Renders as an `H3` typographic style, with optional `secondaryContent` on the trailing end.
 * Rendered by `InputWrapper`; use directly only for custom layouts.
 *
 * @example
 * <FormLabel id="email" title="Email Address" />
 *
 * @example
 * <FormLabel id="attachments" title="Attachments" divider />
 *
 * @example
 * <FormLabel id="contents" title="Contents" secondaryContent={<IconButton icon="Plus" onClick={onAdd} />} divider />
 */
export const FormLabel = ({
	id,
	title,
	size = 'md',
	divider,
	secondaryContent,
}: FormLabelProps) => {
	return (
		<div className={styles.root({ size })}>
			<div className={styles.row}>
				<label id={`${id}-label`} htmlFor={id} className={styles.label}>
					<Text marginBottom={false} weight="semibold" size={size}>
						{title}
					</Text>
				</label>
				{secondaryContent}
			</div>
			{divider && <Divider width="100%" marginY="2px" />}
		</div>
	);
};
