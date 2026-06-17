'use client';
import { createContext, useContext } from 'react';
import { ThreadFoundation, ThreadProviderProps } from './thread-provider.types';
import { ThemeProvider } from '../theme-provider/theme-provider';

// ─── Context ──────────────────────────────────────────────────────────────────
const FoundationContext = createContext<ThreadFoundation | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ThreadProvider = ({ children, theme, linkComponent }: ThreadProviderProps) => {
	const LinkComponent = linkComponent ?? 'a';

	const contextValue: ThreadFoundation = { LinkComponent };

	return (
		<FoundationContext.Provider value={contextValue}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</FoundationContext.Provider>
	);
};

export const useLinkComponent = () => {
	const context = useContext(FoundationContext);
	return context?.LinkComponent ?? 'a';
};
