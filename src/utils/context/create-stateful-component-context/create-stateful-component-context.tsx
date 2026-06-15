'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	type Dispatch,
	type SetStateAction,
	type ReactNode,
} from 'react';

export const createStatefulComponentContext = <T,>(displayName: string) => {
	type ContextValue = {
		value: T;
		setValue: Dispatch<SetStateAction<T>>;
	};

	const Context = createContext<ContextValue | undefined>(undefined);
	Context.displayName = displayName;

	function StatefulProvider({
		initialValue,
		syncKeys,
		children,
	}: {
		initialValue: T;
		/** Keys from initialValue to keep in sync when their values change in the parent. */
		syncKeys?: (keyof T)[];
		children: ReactNode;
	}) {
		const [value, setValue] = useState<T>(initialValue);

		// Stable serialization of just the watched values for the dependency array
		const syncDep = syncKeys ? JSON.stringify(syncKeys.map((k) => initialValue[k])) : undefined;

		useEffect(() => {
			if (!syncKeys) return;
			setValue((prev) => {
				const next = { ...prev };
				for (const key of syncKeys) {
					next[key] = initialValue[key];
				}
				return next;
			});
		}, [syncDep]);

		const ctxValue = useMemo(() => ({ value, setValue }), [value]);
		return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
	}

	StatefulProvider.displayName = `${displayName}Provider`;

	function useStatefulComponentContext(): ContextValue {
		const ctx = useContext(Context);
		if (!ctx) throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
		return ctx;
	}

	return [StatefulProvider, useStatefulComponentContext] as const;
};
