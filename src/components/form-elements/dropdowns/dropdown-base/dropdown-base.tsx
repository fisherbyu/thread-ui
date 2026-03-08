'use client';
import { useRef } from 'react';
import { DropdownBaseProps } from './dropdown-base.types';
import { InputWrapper } from '../../input-wrapper';
import { FormLabel } from '../../form-label';
import { Icon } from '@/components/ui';
import { css, cx } from '@/styled-system/css';
import { baseInputStyles } from '../../styles';
import { useClickOutside } from '@/hooks';

export const styles = {
	container: css({
		width: '100%',
		color: 'text.standard',
	}),
	interior: css({
		width: '100%',
		position: 'relative',
	}),
	surfaceButton: css({
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	}),
	list: css({
		backgroundColor: 'background',
		position: 'absolute',
		width: '100%',
		borderWidth: 'md',
		borderColor: 'structure',
		borderRadius: 'md',
		marginTop: '1',
		boxShadow: 'lg',
		zIndex: '10',
		maxHeight: '60',
		overflow: 'auto',
	}),
};

export const DropdownBase = ({
	id,
	title,
	isOpen,
	onClose,
	onToggle,
	triggerLabel,
	renderItem,
	options,
	listHeader,
}: DropdownBaseProps) => {
	const listRef = useRef<HTMLUListElement>(null);
	useClickOutside(listRef, isOpen, onClose, false);

	return (
		<div id={id} className={styles.container}>
			<InputWrapper>
				{title && <FormLabel name={title} title={title} />}
				<div className={styles.interior}>
					<button
						className={cx(styles.surfaceButton, baseInputStyles({ alt: true }))}
						onClick={onToggle}
						type="button"
					>
						<span>{triggerLabel}</span>
						<Icon name={isOpen ? 'CaretUp' : 'CaretDown'} size={16} color="black" />
					</button>
					{isOpen && (
						<ul className={styles.list} ref={listRef}>
							{listHeader && <li>{listHeader}</li>}
							{options.map((option, index) => renderItem(option, index))}
						</ul>
					)}
				</div>
			</InputWrapper>
		</div>
	);
};
