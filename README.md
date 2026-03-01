# Thread UI

Thread is a React component library I built to create my [personal website](https://fisherandrew.org). It's designed around a clean, token-based theme system with full SSR support, dark mode, and easy customization.

## Get Started

All components work out of the box. Full documentation coming soon at thread.fisherandrew.org.

```bash
npm install thread-ui
```

## Features

### Custom Themes

Thread supports custom themes that override the default design tokens, including when using SSR. Wrap your app in `ThemeProvider` and pass a partial `ThemeConfig` — customize as much or as little as you want.

```tsx
const customTheme: ThemeConfig = {
	primary: {
		light: '#4f46e5',
		main: '#4338ca',
		dark: '#3730a3',
	},
};

return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
```

### Dark Mode

Thread includes a built-in light/dark/system mode system. The `ThreadScript` component injects an inline script into your `<head>` that reads the user's saved preference from `localStorage` and sets `data-theme` on `:root` before the first paint — eliminating any flash of wrong-mode content.

```tsx
// Next.js App Router
<html suppressHydrationWarning>
	<head>
		<ThreadScript defaultMode="system" />
	</head>
	<body>
		<ThemeProvider>{children}</ThemeProvider>
	</body>
</html>
```

### SSR Compatible

Component CSS is pre-generated using Panda CSS, so components render correctly server-side without any runtime style injection. Most components are SSR compatible, and all work out of the box with `Next.js`.

## Components

### UI Elements

`Button` `Card` `Divider` `Icon` `IconButton` `Modal` `Toggle` `DotsLoader` `SpinLoader` `Skeleton` `SkeletonLayout`

### Media Display

`ImagePanel` `InfoCard` `MediaCard`

### Typography Elements

`Title` `H1` `H2` `H3` `Text` `Subtitle` `List` `OrderedList` `PageHeader`

### Navigation Components

`NavMenu` `SideNav`

### Form Elements

`Dropdown` `FileUpload` `FormLabel` `NumberInput` `TextInput`

### Layout Components

`ColumnLayout` `Footer` `MasonryLayout`
