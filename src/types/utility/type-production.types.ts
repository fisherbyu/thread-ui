/**
 * Override properties of type `T` with properties of type `U`.
 * Properties in `U` replace matching properties in `T`.
 *
 * @example
 * type Base = { id: number; name: string; active: boolean };
 * type Result = Override<Base, { id: string; active: 0 | 1 }>;
 * // { name: string; id: string; active: 0 | 1 }
 */
export type Override<T, U> = Omit<T, keyof U> & U;

/**
 * Flatten intersection types into a single object type for cleaner
 * IDE tooltips and intellisense.
 *
 * @example
 * type Messy = { a: string } & { b: number };
 * type Clean = Prettify<Messy>;
 * // { a: string; b: number }
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Recursively make specified key(s) optional throughout `T`
 * and all nested object types.
 *
 * @example
 * type User = { id: number; name: string; posts: { id: number; title: string }[] };
 * type Result = OptionalKey<User, 'id'>;
 * // { id?: number; name: string; posts: { id?: number; title: string }[] }
 */
export type OptionalKey<T, K extends string> = T extends (infer U)[]
	? OptionalKey<U, K>[]
	: T extends object
		? Prettify<
				{ [P in Exclude<keyof T, K>]: OptionalKey<T[P], K> } & {
					[P in Extract<keyof T, K>]?: T[P];
				}
			>
		: T;

/**
 * Recursively replace the type of specified key(s) with `R`
 * throughout `T` and all nested object types.
 *
 * @example
 * type User = { id: number; name: string; posts: { id: number; title: string }[] };
 * type Result = ReplaceKey<User, 'id', string>;
 * // { id: string; name: string; posts: { id: string; title: string }[] }
 */
export type ReplaceKey<T, K extends string, R> = T extends (infer U)[]
	? ReplaceKey<U, K, R>[]
	: T extends object
		? Prettify<
				{ [P in Exclude<keyof T, K>]: ReplaceKey<T[P], K, R> } & {
					[P in Extract<keyof T, K>]: R;
				}
			>
		: T;

/** Recursively Replace values with string  */
export type DeepStringify<T> = {
	[K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};
