'use client';
import { cva } from '@/styled-system/css';
import { FilterControlsProps, ActiveFilter } from './filter-controls.types';
import { Button } from '@/components';
import { MultiDropdown } from '../../form-elements';

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

export const FilterControls = <T,>({
	color = 'tertiary',
	fields,
	activeFilters,
	onToggle,
	onClear,
	onClearAll,
	size = 'sm',
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
					/>
				);
			})}
			{activeFilters.length > 0 && (
				<Button
					color="text"
					onClick={onClearAll}
					size={size}
					text
					aria-label="Clear all filters"
				>
					Clear
				</Button>
			)}
		</div>
	);
};
