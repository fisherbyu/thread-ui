'use client';
import React from 'react';
import { css } from '@/styled-system/css';
import { SortControlsProps, ActiveSort } from './sort-controls.types';
import { Button, Icon, IconButton, Text } from '@/components';

const styles = {
	controlsContainer: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '1',
	}),
};

export const SortControls = <T,>({
	fields,
	activeSort,
	onToggle,
	onClear,
	multi,
}: SortControlsProps<T>) => {
	const getState = (key: keyof T): ActiveSort<T> | undefined =>
		activeSort.find((s) => s.key === key);

	return (
		<div className={styles.controlsContainer}>
			{fields.map(({ key, label, icon }) => {
				const state = getState(key);
				return (
					<React.Fragment key={String(key)}>
						{icon ? (
							<IconButton
								color="tertiary"
								size="sm"
								name={icon}
								onClick={() => onToggle(key)}
							>
								{label}
								{state && <SortIndicator direction={state.direction} />}
							</IconButton>
						) : (
							<Button color="tertiary" size="sm" onClick={() => onToggle(key)}>
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
