'use client';
import { cva } from '@/styled-system/css';
import { FilterControlsProps, ActiveFilter } from '../filter-controls.types';
import { Button, Text } from '@/components';
import { MultiDropdown } from '../../../data-input';

const styles = {
	container: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
		},
		variants: {
			size: {
				sm: { gap: '1' },
				md: { gap: '2' },
				lg: { gap: '3' },
			},
		},
	}),
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
	showFilterLabel = false,
}: FilterControlsProps<T>) => {
	const getActive = (key: keyof T): ActiveFilter<T> | undefined =>
		activeFilters.find((f) => f.key === key);

	return (
		<div className={styles.container({ size })}>
			{showFilterLabel && <Text weight="semibold">Filters</Text>}
			<div className={styles.controlsContainer({ size })}>
				{fields.map(({ key, label, icon, color: fieldColor, options }) => {
					const active = getActive(key);
					const selectedValues = (active?.values ?? []) as (string | number)[];

					return (
						<MultiDropdown
							size={size}
							key={String(key)}
							name={String(key)}
							title={label}
							options={options as { label: string; value: string | number }[]}
							value={selectedValues}
							onChange={(next) => {
								// Clear arrives as an empty selection; anything else changes exactly one value
								if (next.length === 0) {
									onClear(key);
									return;
								}
								const toggled =
									next.find((v) => !selectedValues.includes(v)) ??
									selectedValues.find((v) => !next.includes(v));
								if (toggled !== undefined) {
									onToggle(key, toggled as T[keyof T]);
								}
							}}
							variant="button"
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
		</div>
	);
};
