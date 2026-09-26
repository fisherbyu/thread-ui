import type { Prettify } from '@/types';
import type { BaseInputProps, ControlledValueProps } from '../../shared/input-props.types';
import type { FormLabelProps } from '../../shared/form-label';
import type {
	FormValueMode,
	NumericKeys,
	ReorderableItem,
	ReorderableItemComponent,
	ReorderableLayout,
	ReorderableWrapper,
} from '../shared';

/** Props for a `ReorderableList`, a controlled input whose value is an ordered list of items. */
export type ReorderableListProps<T extends ReorderableItem> = Prettify<
	{
		/** Items to render, in display order. */
		value: ControlledValueProps<T[], T[]>['value'];
		/** Number property rewritten with each item's new index after a reorder. Omit to rely on array order alone. */
		orderProperty?: NumericKeys<T>;
		/** Component rendered for each item. Receives the `item`, a default `dragHandle`, spreadable `dragHandleProps`, `onItemChange`, `onItemRemove`, and `isDragging`. */
		ItemComponent: ReorderableItemComponent<T>;
		/** Fires with the full list after a reorder or an item update. */
		onChange: ControlledValueProps<T[], T[]>['onChange'];
		/**
		 * Human-readable name for an item, used in screen reader announcements and the drag handle's `aria-label`.
		 * @default `'Item {n}'`
		 */
		getItemLabel?: (item: T, index: number) => string;
		/** Arrangement of items; also selects the sorting strategy @default `'vertical'` */
		layout?: ReorderableLayout;
		/** Lays out the rendered items. Replaces the default `layout` styles, so pass a `layout` that matches it. */
		ItemsWrapper?: ReorderableWrapper;
		/** Form field name. `formValue` sets how the order is submitted. */
		name?: BaseInputProps['name'];
		/** Submission shape when `name` is set. `'inputs'`: `formData.getAll(name)` returns ids; `'json'`: read with `parseReorderableValue` @default `'inputs'` */
		formValue?: FormValueMode;
	} & Pick<BaseInputProps, 'id' | 'title' | 'size' | 'divider'> &
		Pick<FormLabelProps, 'secondaryContent'>
>;
