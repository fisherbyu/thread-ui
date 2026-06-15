'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
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
		syncedKeys,
		children,
	}: {
		initialValue: T;
		/** Keys from initialValue to keep in sync when their values change in the parent. */
		syncedKeys?: (keyof T)[];
		children: ReactNode;
	}) {
		const [value, setValue] = useState<T>(initialValue);
		const prevSyncedRef = useRef<Partial<T>>({});

		useEffect(() => {
			if (!syncedKeys) return;

			const changed = syncedKeys.some((k) => initialValue[k] !== prevSyncedRef.current[k]);

			if (changed) {
				setValue((prev) => {
					const next = { ...prev };
					for (const key of syncedKeys) {
						next[key] = initialValue[key];
					}
					return next;
				});

				const snapshot: Partial<T> = {};
				for (const key of syncedKeys) {
					snapshot[key] = initialValue[key];
				}
				prevSyncedRef.current = snapshot;
			}
		});

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
