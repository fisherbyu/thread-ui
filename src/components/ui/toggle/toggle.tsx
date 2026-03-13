import { getUtilityColorValue } from '@/utils';
import { ToggleProps } from './toggle.types';
import { ThreadTheme } from '@/theme';
import { css, cx } from '@/styled-system/css';

const styles = {
	button: css({
		position: 'relative',
		display: 'inline-flex',
		alignItems: 'center',
		height: '24px',
		width: '44px',
		borderRadius: '9999px',
		transition: 'background-color 200ms ease-in-out',
		outline: 'none',
	}),
	knob: css({
		display: 'inline-block',
		height: '16px',
		width: '16px',
		backgroundColor: 'white',
		borderRadius: '9999px',
		transform: 'translateX(4px)',
		transition: 'transform 200ms ease-in-out',
	}),
	knobOn: css({
		transform: 'translateX(24px)',
	}),
	srOnly: css({
		position: 'absolute',
		width: '1px',
		height: '1px',
		padding: '0',
		margin: '-1px',
		overflow: 'hidden',
		clip: 'rect(0, 0, 0, 0)',
		whiteSpace: 'nowrap',
		borderWidth: '0',
	}),
};

/**
 * Accessible toggle switch with a sliding knob and configurable active color.
 *
 * @example
 * <Toggle isOn={enabled} onToggle={() => setEnabled(!enabled)} color="primary" />
 */
export const Toggle = ({ isOn, onToggle, color = 'success' }: ToggleProps) => {
	const colorValue = getUtilityColorValue(color);

	return (
		<button
			type="button"
			onClick={onToggle}
			className={styles.button}
			style={{ backgroundColor: isOn ? colorValue : ThreadTheme.gray.main }}
		>
			<span className={styles.srOnly}>{isOn ? 'On' : 'Off'}</span>
			<span className={cx(styles.knob, isOn && styles.knobOn)} />
		</button>
	);
};
