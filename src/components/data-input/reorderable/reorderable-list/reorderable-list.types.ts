import { Prettify } from '@/types';
import type { BaseInputProps, ControlledValueProps } from '../shared/input-props.types';
import type { ReorderableItem, ReorderableItemComponent } from './sortable-item';
import { FormLabelProps } from '../shared/form-label';

/** Keys of `T` whose values are numbers. */
export type NumericKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

/** Props for a `ReorderableList`, a controlled input whose value is an ordered list of items. */
export type ReorderableListProps<T extends ReorderableItem> = Prettify<
	{
		/** Items to render, in display order. */
		value: ControlledValueProps<T[], T[]>['value'];
		/** Number property rewritten with each item's new index after a reorder. Omit to rely on array order alone. */
		orderProperty?: NumericKeys<T>;
		/** Component rendered for each item. Receives the `item`, a pre-wired `dragHandle`, `onItemChange`, and `isDragging`. */
		ItemComponent: ReorderableItemComponent<T>;
		/** Fires with the full list after a reorder or an item update. */
		onChange: ControlledValueProps<T[], T[]>['onChange'];
		/**
		 * Human-readable name for an item, used in screen reader announcements and the drag handle's `aria-label`.
		 * @default `'Item {n}'`
		 */
		getItemLabel?: (item: T, index: number) => string;
		/** Form field name. When set, renders one hidden input per item so `formData.getAll(name)` returns item `id`s in order. */
		name?: BaseInputProps['name'];
	} & Pick<BaseInputProps, 'id' | 'title' | 'size' | 'divider'> &
		Pick<FormLabelProps, 'secondaryContent'>
>;
