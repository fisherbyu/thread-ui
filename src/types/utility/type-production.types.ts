export type Override<T, U> = Omit<T, keyof U> & U;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type OptionalKey<T, K extends string> = T extends (infer U)[]
	? OptionalKey<U, K>[]
	: T extends object
		? Prettify<
				{ [P in Exclude<keyof T, K>]: OptionalKey<T[P], K> } & {
					[P in Extract<keyof T, K>]?: T[P];
				}
			>
		: T;

export type ReplaceKey<T, K extends string, R> = T extends (infer U)[]
	? ReplaceKey<U, K, R>[]
	: T extends object
		? Prettify<
				{ [P in Exclude<keyof T, K>]: ReplaceKey<T[P], K, R> } & {
					[P in Extract<keyof T, K>]: R;
				}
			>
		: T;
