'use client';
import Toggle from '../toggle';
import { useThemeMode } from '../../../../utils';

export const ModeToggle = () => {
	const [mode, setMode] = useThemeMode();

	return <Toggle isOn={mode === 'dark'} onToggle={() => setMode(mode === 'light' ? 'dark' : 'light')} color="primary" />;
};
