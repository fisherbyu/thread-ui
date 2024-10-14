/**
 * @returns Regular Expressions for CSS Spacing Checks
 */
export const spacingRegexValues = {
	// Regex for Length Values
	// Matches pixel values like '10px', '100px', etc.
	pixelRegex: /^\d+px$/,
	// Matches em values like '1.5em', '0.75em', etc.
	emRegex: /^\d+(\.\d+)?em$/,
	// Matches rem values like '2rem', '0.5rem', etc.
	remRegex: /^\d+(\.\d+)?rem$/,
	// Matches percentage values like '5%', '50%', etc.
	percentRegex: /^\d+(\.\d+)?%$/,
	// Matches viewport units like '10vw', '20vh', etc.
	viewportRegex: /^\d+(\.\d+)?(vw|vh)$/,

	// Regex for 'auto'
	// Matches exactly 'auto'
	autoRegex: /^auto$/,

	// Regex for Zero (0)
	// Matches exactly '0'
	zeroRegex: /^0$/,

	// Regex for Multiple Values
	// Matches 1 to 4 values in any of the Length Values format
	// Allows for single space-separated values
	multipleValuesRegex:
		/^(\d+px|\d+(\.\d+)?em|\d+(\.\d+)?rem|\d+(\.\d+)?%|\d+(\.\d+)?(vw|vh))( (\d+px|\d+(\.\d+)?em|\d+(\.\d+)?rem|\d+(\.\d+)?%|\d+(\.\d+)?(vw|vh))){0,3}$/,

	// Regex for 'inherit'
	// Matches exactly 'inherit'
	inheritRegex: /^inherit$/,
};
