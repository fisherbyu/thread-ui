import { cva } from '@/styled-system/css';
import { FilterControls, InlineFilterControls } from '../filter-controls';
import { SortControls } from '../sort-controls';
import { DataDisplayControlsProps } from './data-display-controls.types';
import { Button } from '@/components/ui';

const styles = cva({
	base: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'start',
	},
	variants: {
		size: {
			sm: { gap: 1 },
			md: { gap: 2 },
			lg: { gap: 3 },
		},
	},
});

export const DataDisplayControls = <T,>({
	fields,
	sortFields,
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
		hideReset: true,
		neutralWhenInactive: true,
	};

	const filterProps = {
		isDefault,
		fields: fields.map((f) => ({ ...f })),
		activeFilters,
		onClear: onClearFilter,
		onClearAll,
		onToggle: onToggleFilter,
		isActive,
	};

	const sortProps = {
		fields: sortFields,
		activeSort,
		onToggle: onToggleSort,
		onClear: onClearAll,
		isDefault,
	};

	const Filter = filterVariant === 'standard' ? FilterControls : InlineFilterControls;

	return (
		<div className={styles({ size })}>
			<Filter {...sharedProps} {...filterProps} />
			<SortControls {...sharedProps} {...sortProps} />
			{!isDefault && (
				<Button size="sm" onClick={onClearAll} text>
					Reset
				</Button>
			)}
		</div>
	);
};
