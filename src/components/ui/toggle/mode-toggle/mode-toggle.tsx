'use client';
import { useThemeMode } from '../../../../functions/theme/old';
import Toggle from '../toggle';

export const ModeToggle = () => {
	const [mode, setMode] = useThemeMode();

	return <Toggle isOn={mode === 'dark'} onToggle={() => setMode(mode === 'light' ? 'dark' : 'light')} color="primary" />;
};
