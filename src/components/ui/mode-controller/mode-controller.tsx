import { useThemeOption } from '../../../functions/theme/old';
import { ThemeModeOption } from '../../../types';

export const ModeController = () => {
	const [option, setOption] = useThemeOption();

	return (
		<select value={option} onChange={(e) => setOption(e.target.value as ThemeModeOption)}>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="system">System</option>
		</select>
	);
};
