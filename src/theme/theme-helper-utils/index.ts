// Helper Types and Functions
// Recursivley transform all string values
type VariableWrapper<T> = T extends string
	? `var(${T})`
	: T extends object
		? { [K in keyof T]: VariableWrapper<T[K]> }
		: T;

// Generate CSS Variable name
export function compileVariableName<T>(obj: T): VariableWrapper<T> {
	if (typeof obj === 'string') {
		return `var(${obj})` as VariableWrapper<T>;
	}

	if (typeof obj === 'object' && obj !== null) {
		const result: any = {};
		for (const key in obj) {
			result[key] = compileVariableName(obj[key]);
		}
		return result;
	}

	return obj as VariableWrapper<T>;
}
