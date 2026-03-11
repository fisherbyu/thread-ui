import { FilterControls, InlineFilterControls } from '../filter-controls';
import { SortControls } from '../sort-controls';
import { DataDisplayControlsProps } from './data-display-controls.types';

export const DataDisplayControls = <T,>({
	fields,
	activeSort,
	activeFilters,
	onClearAll,
	isDefault,
	isActive,
	onClearFilter,
	onToggleFilter,
	onToggleSort,
	size,
	color,
	filterVariant = 'inline',
}: DataDisplayControlsProps<T>) => {
	const sharedProps = {
		color,
		size,
	};
	const filterProps = {
		isDefault,
		fields: fields.map((f) => ({ ...f })),
		activeFilters,
		onClear: onClearFilter,
		onClearAll,
		onToggle: onToggleFilter,
		hideReset: true,
		isActive,
	};

	const sortProps = {
		fields,
		activeSort,
		onToggle: onToggleSort,
		onClear: onClearAll,
		isDefault,
	};
	const Filter = filterVariant === 'standard' ? FilterControls : InlineFilterControls;
	return (
		<div>
			<Filter {...sharedProps} {...filterProps} />
			<SortControls {...sharedProps} {...sortProps} />
		</div>
	);
};
