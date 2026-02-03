// Helper Types
type PrefixedVariable<T, P extends string> = T extends string
	? `${P}${T}`
	: T extends object
		? { [K in keyof T]: PrefixedVariable<T[K], P> }
		: T;

type WrappedVariable<T, P extends string> = T extends string
	? `var(${P}${T})`
	: T extends object
		? { [K in keyof T]: WrappedVariable<T[K], P> }
		: T;

// Separate implementations (no shared generic)
export function prefixVariables<T, P extends string>(obj: T, prefix: P): PrefixedVariable<T, P> {
	if (typeof obj === 'string') {
		return `${prefix}${obj}` as PrefixedVariable<T, P>;
	}
	if (typeof obj === 'object' && obj !== null) {
		const result: any = {};
		for (const key in obj) {
			result[key] = prefixVariables(obj[key], prefix);
		}
		return result;
	}
	return obj as PrefixedVariable<T, P>;
}

export function wrapVariables<T, P extends string>(obj: T, prefix: P): WrappedVariable<T, P> {
	if (typeof obj === 'string') {
		return `var(${prefix}${obj})` as WrappedVariable<T, P>;
	}
	if (typeof obj === 'object' && obj !== null) {
		const result: any = {};
		for (const key in obj) {
			result[key] = wrapVariables(obj[key], prefix);
		}
		return result;
	}
	return obj as WrappedVariable<T, P>;
}
