'use client';
import React from 'react';
import { css, cva } from '@/styled-system/css';
import { SortControlsProps, ActiveSort } from './sort-controls.types';
import { Button, Icon, IconButton, Text } from '@/components';

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
}: SortControlsProps<T>) => {
	const getState = (key: keyof T): ActiveSort<T> | undefined =>
		activeSort.find((s) => s.key === key);

	return (
		<div className={styles.controlsContainer({ size })}>
			{fields.map(({ key, label, icon, color: fieldColor }) => {
				const state = getState(key);
				return (
					<React.Fragment key={String(key)}>
						{icon ? (
							<IconButton
								color={fieldColor ?? color}
								size={size}
								name={icon}
								onClick={() => onToggle(key)}
							>
								{label}
								{state && <SortIndicator direction={state.direction} />}
							</IconButton>
						) : (
							<Button color="tertiary" size={size} onClick={() => onToggle(key)}>
								{label}
								{state && <SortIndicator direction={state.direction} />}
							</Button>
						)}
					</React.Fragment>
				);
			})}

			{activeSort.length > 0 && (
				<button onClick={onClear} aria-label="Clear all sorting">
					<Text size="xs">Clear</Text>
				</button>
			)}
		</div>
	);
};

const SortIndicator = ({ direction }: { direction: 'asc' | 'desc' }) =>
	direction === 'asc' ? <Icon size={8} name="ArrowUp" /> : <Icon size={8} name="ArrowDown" />;
