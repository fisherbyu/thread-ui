import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useTheme } from './use-theme';
import { DEFAULT_THEME } from '../../defaults';
import type { AppliedTheme, ThemeMode } from '../../types';

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
	<div className="thread-flex thread-flex-col thread-items-center thread-mb-4">
		<div className="thread-w-16 thread-h-16 thread-rounded-lg thread-shadow-md thread-mb-2" style={{ backgroundColor: color }} />
		<div className="thread-text-sm thread-font-medium">{name}</div>
		<div className="thread-text-xs thread-text-gray-500">{color}</div>
	</div>
);

const ColorGroup = ({ title, colors }: { title: string; colors: Record<string, string> }) => (
	<div className="thread-mb-1 thread-w-64">
		<h3 className="thread-text-lg thread-font-semibold thread-mb-4">{title}</h3>
		<div className="thread-flex thread-flex-row thread-justify-between thread-items-center thread-w-full">
			{Object.entries(colors).map(([name, color]) => (
				<ColorSwatch key={name} color={color} name={name} />
			))}
		</div>
	</div>
);

const ThemeDisplay = () => {
	const { theme, mode, setMode } = useTheme();

	// Helper function to filter and type check mode-specific colors
	const getModeLayerColors = (currentMode: ThemeMode) => {
		const modeColors = theme.colors[currentMode];
		return Object.entries(modeColors).filter(([key, value]): value is string => typeof value === 'string' && key !== 'text');
	};

	return (
		<div className="thread-p-4">
			<div className="thread-flex thread-justify-between thread-items-center thread-mb-8">
				<h2 className="thread-text-2xl thread-font-bold">Theme Preview</h2>
			</div>

			<section className="thread-flex thread-flex-col">
				<h2 className="thread-text-xl thread-font-bold thread-mb-6">Brand Colors</h2>
				{/* Brand Colors */}
				<div className="thread-w-full thread-flex thread-flex-row thread-items-center thread-justify-around">
					<ColorGroup title="Primary" colors={theme.colors.primary} />
					<ColorGroup title="Secondary" colors={theme.colors.secondary} />
					<ColorGroup title="Tertiary" colors={theme.colors.tertiary} />
				</div>
			</section>

			<div className="thread-space-y-12">
				{/* Primary Colors */}
				<section></section>

				{/* Status Colors */}
				<section>
					<h2 className="thread-text-xl thread-font-bold thread-mb-6">Status Colors</h2>
					<ColorGroup title="Success" colors={theme.colors.success} />
					<ColorGroup title="Warning" colors={theme.colors.warning} />
					<ColorGroup title="Error" colors={theme.colors.error} />
					<ColorGroup title="Info" colors={theme.colors.info} />
				</section>

				{/* Mode-specific Colors */}
				<section>
					<h2 className="thread-text-xl thread-font-bold thread-mb-6">Mode-Specific Colors</h2>
					<div className="thread-mb-8">
						<h3 className="thread-text-lg thread-font-semibold thread-mb-4">Layer Colors</h3>
						<div className="thread-grid thread-grid-cols-3 md:thread-grid-cols-4 lg:thread-grid-cols-6 thread-gap-4">
							{getModeLayerColors(mode).map(([name, color]) => (
								<ColorSwatch key={name} color={color} name={name} />
							))}
						</div>
					</div>
					<div className="thread-mb-8">
						<h3 className="thread-text-lg thread-font-semibold thread-mb-4">Text Colors</h3>
						<div className="thread-grid thread-grid-cols-3 md:thread-grid-cols-4 lg:thread-grid-cols-6 thread-gap-4">
							{Object.entries(theme.colors[mode].text).map(([name, color]) => (
								<ColorSwatch key={name} color={color} name={name} />
							))}
						</div>
					</div>
				</section>

				{/* Neutral Colors */}
				<section>
					<h2 className="thread-text-xl thread-font-bold thread-mb-6">Neutral Colors</h2>
					<div className="thread-grid thread-grid-cols-3 md:thread-grid-cols-4 lg:thread-grid-cols-6 thread-gap-4 thread-mb-8">
						<ColorSwatch color={theme.colors.white} name="White" />
						<ColorSwatch color={theme.colors.black} name="Black" />
					</div>
					<ColorGroup title="Gray" colors={theme.colors.gray} />
				</section>
			</div>

			{/* Border Information */}
			<section className="thread-mt-12">
				<h2 className="thread-text-xl thread-font-bold thread-mb-6">Border Specifications</h2>
				<div className="thread-grid thread-grid-cols-2 thread-gap-8">
					<div>
						<h3 className="thread-text-lg thread-font-semibold thread-mb-4">Border Radius</h3>
						<div className="thread-space-y-4">
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
						<div className="thread-space-y-4">
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
	decorators: [
		(Story) => (
			<ThemeProvider initialTheme={DEFAULT_THEME}>
				<Story />
			</ThemeProvider>
		),
	],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof ThemeDisplay>;

export default meta;
type Story = StoryObj<typeof ThemeDisplay>;

export const Default: Story = {};
