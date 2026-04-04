'use client';
import { useRef } from 'react';
import { DropdownBaseProps } from './dropdown-base.types';
import { InputWrapper } from '../../input-wrapper';
import { FormLabel } from '../../form-label';
import { Button, Icon } from '@/components/ui';
import { css } from '@/styled-system/css';
import { useClickOutside } from '@/hooks';
import { getUtilityIconSize } from '@/utils';
import { ConditionalWrapper, OptionalIconButton } from '@/internal-components';

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
		backgroundColor: 'overlay',
		position: 'absolute',
		width: 'fit-content',
		minWidth: '75%',
		borderWidth: 'md',
		borderColor: 'structure',
		borderRadius: 'md',
		marginTop: '3',
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
	size = 'md',
	icon,
	color = 'neutral',
}: DropdownBaseProps) => {
	const listRef = useRef<HTMLUListElement>(null);
	useClickOutside(listRef, isOpen, onClose, false);

	return (
		<div id={id} className={styles.container}>
			<ConditionalWrapper wrapper={title ? InputWrapper : 'fragment'}>
				{title && <FormLabel size={size} name={title} title={title} />}
				<div className={styles.interior}>
					<OptionalIconButton
						size={size}
						color={color}
						onClick={onToggle}
						type="button"
						name={icon}
					>
						{triggerLabel}
						<Icon
							name={isOpen ? 'CaretUp' : 'CaretDown'}
							size={getUtilityIconSize(size)}
						/>
					</OptionalIconButton>
					{isOpen && (
						<ul className={styles.list} ref={listRef}>
							{listHeader && <li>{listHeader}</li>}
							{options.map((option, index) => renderItem(option, index))}
						</ul>
					)}
				</div>
			</ConditionalWrapper>
		</div>
	);
};
