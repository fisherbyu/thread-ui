// Basic Shades
type ColorShades = {
	light: string;
	main: string;
	dark: string;
};

// Text Colors
export type TextColors = {
	primary: string;
	secondary: string;
	disabled: string;
};

// UI Layer Colors
type SurfaceColors = {
	background: string; // Main Background
	structure: string; // Borders etc
	surface: string; // Layered component background
	elevated: string; // Further layer bakground
};

export type StructureColors = SurfaceColors & {
	text: TextColors;
};

export type ModeStructureColors = {
	light: StructureColors;
	dark: StructureColors;
};

// Basic Theme, Neutral and Status Colors
export type ThemeColors = {
	// Primary Color Theme
	primary: ColorShades;
	secondary: ColorShades;
	tertiary: ColorShades;

	// Neutral Colors
	white: string;
	black: string;
	gray: ColorShades;

	// Status Colors
	success: ColorShades;
	warning: ColorShades;
	error: ColorShades;
	info: ColorShades;
};
