'use client';
import { cva } from '@/styled-system/css';
import { FilterControlsProps, ActiveFilter } from '../filter-controls.types';
import { Button } from '@/components';
import { MultiDropdown } from '../../../form-elements';

const styles = {
	controlsContainer: cva({
		base: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			width: 'fit-content',
		},
		variants: {
			size: {
				sm: { gap: '1' },
				md: { gap: '2' },
				lg: { gap: '3' },
			},
		},
	}),
};

/**
 * Renders a row of multi-select dropdown filters and a reset button.
 * Designed to be used with `useFilterControls` via `filterControlsProps`.
 *
 * @example
 * const { filteredData, filterControlsProps } = useFilterControls({ data, fields });
 * <FilterControls {...filterControlsProps} />
 */
export const FilterControls = <T,>({
	fields,
	activeFilters,
	onToggle,
	onClear,
	onClearAll,
	size = 'sm',
	isDefault,
	color,
	hideReset = false,
	neutralWhenInactive = false,
}: FilterControlsProps<T>) => {
	const getActive = (key: keyof T): ActiveFilter<T> | undefined =>
		activeFilters.find((f) => f.key === key);

	return (
		<div className={styles.controlsContainer({ size })}>
			{fields.map(({ key, label, icon, color: fieldColor, options }) => {
				const active = getActive(key);
				const selectedValues = (active?.values ?? []) as (string | number)[];

				return (
					<MultiDropdown
						size={size}
						key={String(key)}
						id={String(key)}
						title={label}
						options={options as { label: string; value: string | number }[]}
						values={selectedValues}
						onToggle={(value) => onToggle(key, value as T[keyof T])}
						onClear={() => onClear(key)}
						icon={icon}
						showLabel={false}
						color={active ? color : undefined}
					/>
				);
			})}
			{!isDefault && !hideReset && (
				<Button
					color="text"
					onClick={onClearAll}
					size={size}
					text
					ariaLabel="Clear all filters"
				>
					Reset
				</Button>
			)}
		</div>
	);
};
