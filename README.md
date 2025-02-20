# Thread UI

Thread is a UI Library I created for use in my personal website.

# Get Started

All components work out of the box. Documentation coming soon to thread.fisherandrew.org

## Custom Themes

Thread-UI supports custom themes created by the user that override the default theme, even when using SSR in Next.js. To implement a custom theme, first create a config file in the root of the project named `thread.config.ts`. Define the Theme attributes you'd like to override, initilize it using using the thread-ui `createTheme` function, and export your theme.

```
import { createTheme } from 'thread-ui';

const threadConfig = {
	colors: {
		primary: {
			light: '#4f46e5',
			main: '#4338ca',
			dark: '#3730a3',
		},
	},
} as const;

// Initialize Theme
export const ThreadTheme = createTheme(threadConfig);
```

Next, create a provider component that will make our custom theme availible in `app/providers.tsx`.

```
'use client';
import { ThemeProvider } from 'thread-ui';
import { ThreadTheme } from '@/thread.config';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider initialTheme={ThreadTheme} initialMode="light">
			{children}
		</ThemeProvider>
	);
}
```

Last, wrap your root layout content in this provider in `app/layout.tsx`

```
const font = Merriweather_Sans({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.className}`}>
				<Providers>
					<NavMenu />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
```
