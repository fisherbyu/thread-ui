import { Override, Prettify } from '@/types';
import { BaseInputProps } from '../input-props.types';

export type FormLabelProps = Prettify<
	Pick<
		Override<
			BaseInputProps,
			{
				/** Id of the control this label points to via `htmlFor`; the label's own id is `${id}-label` */
				id: string;
			}
		>,
		'id' | 'title' | 'size' | 'divider'
	>
>;
