/** Recursively makes all properties of `T` optional, including nested objects */
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
