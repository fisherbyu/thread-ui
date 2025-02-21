'use client';
import { CSSProperties } from 'react';
import { useTheme } from '../../utils';
import { ToggleProps } from './toggle.types';

export const Toggle = ({ isOn, onToggle }: ToggleProps) => {
	const { theme } = useTheme();

	const styles: Record<string, CSSProperties> = {
		button: {
			position: 'relative',
			display: 'inline-flex',
			alignItems: 'center',
			height: '24px',
			width: '44px',
			borderRadius: '9999px',
			transition: 'background-color 200ms ease-in-out',
			outline: 'none',
		},
		buttonOn: {
			backgroundColor: theme.colors.primary.main,
		},
		buttonOff: {
			backgroundColor: theme.colors.gray.main,
		},
		knob: {
			display: 'inline-block',
			height: '16px',
			width: '16px',
			backgroundColor: 'white',
			borderRadius: '9999px',
			transform: 'translateX(4px)',
			transition: 'transform 200ms ease-in-out',
		},
		knobOn: {
			transform: 'translateX(24px)',
		},
		srOnly: {
			position: 'absolute',
			width: '1px',
			height: '1px',
			padding: '0',
			margin: '-1px',
			overflow: 'hidden',
			clip: 'rect(0, 0, 0, 0)',
			whiteSpace: 'nowrap',
			borderWidth: '0',
		},
	};

	return (
		<button
			type="button"
			onClick={onToggle}
			style={{
				...styles.button,
				...(isOn ? styles.buttonOn : styles.buttonOff),
			}}
		>
			<span style={styles.srOnly}>{isOn ? 'On' : 'Off'}</span>
			<span
				style={{
					...styles.knob,
					...(isOn ? styles.knobOn : {}),
				}}
			/>
		</button>
	);
};

export default Toggle;
