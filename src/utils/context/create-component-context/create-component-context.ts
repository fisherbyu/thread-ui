import { createContext, useContext } from 'react';

export const createComponentContext = <T>(displayName: string) => {
	const Context = createContext<T | undefined>(undefined);
	Context.displayName = displayName;

	function useComponentContext() {
		const ctx = useContext(Context);
		if (!ctx) throw new Error(`use${displayName} must be used within a ${displayName}Provider`);
		return ctx;
	}

	return [Context.Provider, useComponentContext] as const;
};
