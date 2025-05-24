import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from './use-theme';
import type { ThemeMode } from '../../../types';
import { Divider } from '../../../';

interface ColorSwatchProps {
	color: string;
	name: string;
}

const ColorSwatch = ({ color, name }: ColorSwatchProps) => (
	<div className="thread-flex thread-flex-col thread-items-center thread-mb-1">
		<div className="thread-w-16 thread-h-16 thread-rounded-lg thread-shadow-md thread-mb-2" style={{ backgroundColor: color }} />
		<div className="thread-text-sm thread-font-medium">{name}</div>
		<div className="thread-text-xs thread-text-gray-500">{color}</div>
	</div>
);

interface ColorGroupProps {
	title: string;
	colors: Record<string, string>;
}

const ColorGroup = ({ title, colors }: ColorGroupProps) => {
	// Reorder colors to show main first, then light and dark
	const orderedColors: [string, string][] = [];
	if ('main' in colors) orderedColors.push(['main', colors.main]);
	if ('light' in colors) orderedColors.push(['light', colors.light]);
	if ('dark' in colors) orderedColors.push(['dark', colors.dark]);

	// Add any remaining colors
	Object.entries(colors).forEach(([key, value]) => {
		if (!['main', 'light', 'dark'].includes(key)) {
			orderedColors.push([key, value]);
		}
	});

	return (
		<div className="thread-w-64">
			<h3 className="thread-text-lg thread-font-semibold thread-mb-4">{title}</h3>
			<div className="thread-flex thread-flex-row thread-justify-between thread-items-center thread-w-full">
				{orderedColors.map(([name, color]) => (
					<ColorSwatch key={name} color={color} name={name} />
				))}
			</div>
		</div>
	);
};

const ThemeDisplay = () => {
	const { theme } = useTheme();

	// Helper function to filter and type check mode-specific colors
	const getModeLayerColors = (currentMode: ThemeMode): [string, string][] => {
		const modeColors = theme.colors[currentMode];
		return Object.entries(modeColors).filter(([key, value]): value is string => key !== 'text' && typeof value === 'string') as [
			string,
			string,
		][];
	};

	return (
		<div className="thread-p-4">
			<div className="thread-flex thread-justify-between thread-items-center thread-mb-1">
				<h2 className="thread-text-2xl thread-font-bold">Theme</h2>
			</div>
			<Divider width="100%" />
			<div className="thread-grid sm:thread-grid-cols-1 md:thread-grid-cols-2 thread-gap-6 px-2">
				<section className="thread-flex-col thread-justify-center thread-mx-auto">
					<h2 className="thread-text-xl thread-font-medium thread-mb-1">Brand Colors</h2>
					<ColorGroup title="Primary" colors={theme.colors.primary as Record<string, string>} />
					<Divider width="100%" />
					<ColorGroup title="Secondary" colors={theme.colors.secondary as Record<string, string>} />
					<Divider width="100%" />
					<ColorGroup title="Tertiary" colors={theme.colors.tertiary as Record<string, string>} />
				</section>
				<section className="thread-flex-col thread-justify-center">
					<h2 className="thread-text-xl thread-font-medium thread-mb-1">Status Colors</h2>
					<ColorGroup title="Success" colors={theme.colors.success as Record<string, string>} />
					<Divider width="100%" />
					<ColorGroup title="Warning" colors={theme.colors.warning as Record<string, string>} />
					<Divider width="100%" />
					<ColorGroup title="Error" colors={theme.colors.error as Record<string, string>} />
					<Divider width="100%" />
					<ColorGroup title="Info" colors={theme.colors.info as Record<string, string>} />
				</section>
			</div>

			{/* Mode-specific Colors */}
			<section className="thread-mb-12">
				<h2 className="thread-text-xl thread-font-bold thread-mb-6">Mode-Specific Colors</h2>
				<div className="thread-space-y-8">
					<div className="thread-space-y-6">
						<h3 className="thread-text-lg thread-font-semibold thread-capitalize">Layer Colors</h3>
						<div className="thread-space-y-8">
							<div>
								<h4 className="thread-text-md thread-font-medium thread-mb-2">Light Mode</h4>
								<div className="thread-grid thread-grid-cols-6 thread-gap-4">
									{getModeLayerColors('light').map(([name, color]) => (
										<ColorSwatch key={name} color={color} name={name} />
									))}
								</div>
								<h4 className="thread-text-md thread-font-medium thread-mb-2">Dark Mode</h4>
								<div className="thread-grid thread-grid-cols-6 thread-gap-4">
									{getModeLayerColors('dark').map(([name, color]) => (
										<ColorSwatch key={name} color={color} name={name} />
									))}
								</div>
							</div>
							<Divider width="100%" />

							<div>
								<h3 className="thread-text-lg thread-font-semibold thread-capitalize">Text Colors</h3>
								<div>
									<h4 className="thread-text-md thread-font-medium thread-mb-2">Light Mode</h4>
									<div className="thread-grid thread-grid-cols-6 thread-gap-4">
										{Object.entries(theme.colors.text as Record<string, string>).map(([name, color]) => (
											<ColorSwatch key={name} color={color} name={name} />
										))}
									</div>
									<h4 className="thread-text-md thread-font-medium thread-mb-2">Dark Mode</h4>
									<div className="thread-grid thread-grid-cols-6 thread-gap-4">
										{Object.entries(theme.colors.text as Record<string, string>).map(([name, color]) => (
											<ColorSwatch key={name} color={color} name={name} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Neutral Colors */}
			<section className="thread-mb-12">
				<h2 className="thread-text-xl thread-font-bold thread-mb-6">Neutral Colors</h2>
				<div className="thread-flex thread-gap-8 thread-mb-8">
					<ColorSwatch color={theme.colors.white as string} name="White" />
					<ColorSwatch color={theme.colors.black as string} name="Black" />
				</div>
				<ColorGroup title="Gray" colors={theme.colors.gray as Record<string, string>} />
			</section>

			{/* Border Information */}
			<section className="thread-mt-12">
				<h2 className="thread-text-xl thread-font-bold thread-mb-6">Border Specifications</h2>
				<div className="thread-space-y-8">
					<div>
						<h3 className="thread-text-lg thread-font-semibold thread-mb-4">Border Radius</h3>
						<div className="thread-grid thread-grid-cols-4 thread-gap-8">
							{Object.entries(theme.border.radius).map(([size, value]) => (
								<div key={size} className="thread-flex thread-items-center thread-space-x-4">
									<div
										className="thread-w-16 thread-h-16 thread-bg-gray-200"
										style={{ borderRadius: `${value}px` }}
									/>
									<div>
										<div className="thread-font-medium">{size}</div>
										<div className="thread-text-sm thread-text-gray-500">{value}px</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<h3 className="thread-text-lg thread-font-semibold thread-mb-4">Border Size</h3>
						<div className="thread-grid thread-grid-cols-4 thread-gap-8">
							{Object.entries(theme.border.size).map(([size, value]) => (
								<div key={size} className="thread-flex thread-items-center thread-space-x-4">
									<div
										className="thread-w-16 thread-h-16 thread-bg-white"
										style={{ border: `${value}px solid #000` }}
									/>
									<div>
										<div className="thread-font-medium">{size}</div>
										<div className="thread-text-sm thread-text-gray-500">{value}px</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

const meta = {
	title: 'Theme/ThemePreview',
	component: ThemeDisplay,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof ThemeDisplay>;

export default meta;
type Story = StoryObj<typeof ThemeDisplay>;

export const Default: Story = {};
