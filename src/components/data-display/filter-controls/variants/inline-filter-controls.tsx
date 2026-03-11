'use client';
import { cva, cx } from '@/styled-system/css';
import { FilterControlsProps } from '../filter-controls.types';
import { Button, ButtonProps } from '@/components';
import { OptionalIconButton } from '@/internal-components';

const styles = {
	container: cva({
		base: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			flexWrap: 'wrap',
		},
		variants: {
			size: {
				sm: { gap: '1' },
				md: { gap: '2' },
				lg: { gap: '3' },
			},
		},
	}),
	groupLabel: cva({
		base: {
			fontWeight: 'semibold',
			color: 'text.secondary',
		},
		variants: {
			size: {
				sm: { fontSize: 'xs' },
				md: { fontSize: 'sm' },
				lg: { fontSize: 'md' },
			},
		},
	}),
};

/**
 * Renders all filter options as inline toggle buttons.
 * Designed to be used with `useFilterControls` via `filterControlsProps`.
 *
 * Each option is always visible — clicking toggles it on or off.
 * Active options appear filled; inactive ones appear as outlines.
 *
 * @example
 * const { filteredData, filterControlsProps } = useFilterControls({ data, fields });
 * <FilterBar {...filterControlsProps} />
 */
export const InlineFilterControls = <T,>({
	fields,
	activeFilters,
	isActive,
	onToggle,
	onClearAll,
	size = 'sm',
	isDefault,
	color = 'tertiary',
}: FilterControlsProps<T>) => {
	return (
		<div className={styles.container({ size })}>
			{fields.map(({ key, label, icon, color: fieldColor, options }) => (
				<div key={String(key)} className={styles.container({ size })}>
					<span className={styles.groupLabel({ size })}>{label}</span>
					{options.map((option) => {
						const active = isActive(key, option.value);

						const resolvedFieldColor: ButtonProps['color'] = active
							? (fieldColor ?? color)
							: 'neutral';

						const buttonProps = {
							color: resolvedFieldColor,
							size,
							onClick: () => onToggle(key, option.value),
							name: icon,
						};

						return (
							<OptionalIconButton key={String(key)} {...buttonProps}>
								{option.label}
							</OptionalIconButton>
						);
					})}
				</div>
			))}
			{!isDefault && (
				<Button
					color="text"
					onClick={onClearAll}
					size={size}
					text
					aria-label="Clear all filters"
				>
					Reset
				</Button>
			)}
		</div>
	);
};
