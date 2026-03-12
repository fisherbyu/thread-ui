'use client';
import { css, cva } from '@/styled-system/css';
import { InlineFilterControlsProps } from '../filter-controls.types';
import { Button, ButtonProps } from '@/components';
import { OptionalIconButton } from '@/internal-components';

const styles = {
	container: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'start',
			flexWrap: 'wrap',
		},
		variants: {
			size: {
				sm: { gap: '1' },
				md: { gap: '2' },
				lg: { gap: '3' },
			},
			filterGroup: {
				true: {
					flexWrap: 'inherit',
				},
			},
			titleInline: {
				true: {
					alignItems: 'center',
					flexDirection: 'row',
				},
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
				sm: { fontSize: 'xs', marginRight: '1' },
				md: { fontSize: 'sm', marginRight: '2' },
				lg: { fontSize: 'md', marginRight: '2' },
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
	isActive,
	onToggle,
	onClearAll,
	size = 'sm',
	isDefault,
	color = 'tertiary',
	fieldTitleDisplay = 'inline',
	hideReset = false,
}: InlineFilterControlsProps<T>) => {
	return (
		<div className={styles.container({ size })}>
			{fields.map(({ key, label, icon, color: fieldColor, options }) => (
				<div
					key={String(key)}
					className={styles.container({
						size,
						filterGroup: true,
						titleInline: fieldTitleDisplay === 'inline',
					})}
				>
					{fieldTitleDisplay !== 'none' && (
						<span className={styles.groupLabel({ size })}>{label}</span>
					)}
					<div
						className={styles.container({ size, filterGroup: true, titleInline: true })}
					>
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
								<OptionalIconButton
									key={`${String(key)}-${option.value}`}
									{...buttonProps}
								>
									{option.label}
								</OptionalIconButton>
							);
						})}
					</div>
				</div>
			))}
			{!hideReset && (
				<div className={css({ minHeight: '6', display: 'flex', alignItems: 'center' })}>
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
			)}
		</div>
	);
};
