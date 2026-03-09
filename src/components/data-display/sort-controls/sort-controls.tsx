'use client';
import { cva } from '@/styled-system/css';
import { SortControlsProps, ActiveSort } from './sort-controls.types';
import { Button, Icon, IconButton, Text } from '@/components';
import { ConditionalWrapper, OptionalIconButton } from '@/internal-components';

const styles = {
	controlsContainer: cva({
		base: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
		},
		variants: {
			size: {
				sm: {
					gap: '1',
				},
				md: {
					gap: '2',
				},
				lg: {
					gap: '3',
				},
			},
		},
	}),
};

export const SortControls = <T,>({
	color = 'tertiary',
	fields,
	activeSort,
	onToggle,
	onClear,
	size = 'sm',
	isDefault,
}: SortControlsProps<T>) => {
	const getState = (key: keyof T): ActiveSort<T> | undefined =>
		activeSort.find((s) => s.key === key);

	return (
		<div className={styles.controlsContainer({ size })}>
			{fields.map(({ key, label, icon, color: fieldColor }) => {
				const state = getState(key);

				const buttonProps = {
					color: fieldColor ?? color,
					size,
					onClick: () => onToggle(key),
					name: icon,
				};

				return (
					<OptionalIconButton key={String(key)} {...buttonProps}>
						{label}
						{state && <SortIndicator direction={state.direction} />}
					</OptionalIconButton>
				);
			})}

			{!isDefault && (
				<Button
					color="text"
					onClick={onClear}
					size={size}
					text
					aria-label="Clear all sorting"
				>
					Reset
				</Button>
			)}
		</div>
	);
};

const SortIndicator = ({ direction }: { direction: 'asc' | 'desc' }) =>
	direction === 'asc' ? <Icon size={8} name="ArrowUp" /> : <Icon size={8} name="ArrowDown" />;
