# Thread UI

Thread is a React component library I built to create my [personal website](https://fisherandrew.org). It's designed around a clean, token-based theme system with full SSR support, dark mode, and easy customization.

## Get Started

All items work out of the box. Explore thread components at [thread.fisherandrew.org](https://thread.fisherandrew.org)!

```bash
npm install thread-ui
```

Then import the styles once in your app's entry point:

```tsx
import 'thread-ui/thread.css';
```

- **Next.js (App Router)**: place in `app/layout.tsx`
- **Next.js (Pages Router)**: place in `pages/_app.tsx`
- **Vite / CRA**: place in `main.tsx` or `index.tsx`
- **Remix**: import in `root.tsx`

## Design System

Thread UI uses a **layer-based elevation system**. Every component either sits on a named layer (canvas, inset, surface, elevated, overlay) or opts out entirely (transparent). The layer determines the component's background color, shadow depth, border treatment, and stacking order.

### Surface Layers

| Layer      | Purpose                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| `canvas`   | Page background. The base everything sits on.                               |
| `inset`    | Recessed containers: inputs, code blocks, wells. Visually below the canvas. |
| `surface`  | Cards, panels, content regions. Pops against canvas.                        |
| `elevated` | Sticky nav, toolbars. Differentiated by shadow in light mode.               |
| `overlay`  | Modals, popovers. Highest elevation.                                        |

```tsx
// Components resolve their bg, shadow, and border from the layer
<Card layer="surface" />

// Individual overrides when needed
<Card layer="surface" bg="elevated" shadow="md" structure="none" />
```

### The Two Rules

1. **Light mode communicates elevation through shadows.** Surface, elevated, and overlay share the same background color — shadows and z-index differentiate them.
2. **Dark mode communicates elevation through lightness.** Each layer step up is slightly lighter. Shadows are nearly invisible against dark surfaces.

### Typography

Thread's typography system is built on **roles** — semantic chords that combine font family, size, weight, line height, letter spacing, and bottom margin into named presets like `title`, `h1`–`h3`, `body`, and `code`. Each role is defined once in the theme and consumed by components (`<Title>`, `<H1>`, `<Text>`, `<Code>`, etc.) so visual hierarchy stays consistent across the app.

Individual tokens (font sizes, weights, line heights, etc.) can be overridden per-instance for fine control, or theme-wide via `ThemeProvider`. Spacing flows through a shared scale (`none` → `xxl`) so heading and paragraph rhythm follows the same vocabulary as the rest of the system.

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

`Button` `Card` `Divider` `DotsLoader` `Icon` `IconButton` `Modal` `SkeletonLayoutLoader` `SkeletonLoader` `SpinLoader` `TabView` `Toggle`

### Media Display

`ImagePanel` `InfoCard` `MediaCard`

### Typography Elements

`Title` `H1` `H2` `H3` `Text` `Subtitle` `List` `OrderedList` `PageHeader`

### Navigation Components

`NavMenu` `SideNav`

### Form Elements

`Dropdown` `FileUpload` `FormLabel` `NumberInput` `TextInput`

### Layout Components

`Container` `ColumnLayout` `Footer` `MasonryLayout`

### Data Display

`DataDisplayControls` `FilterControls` `SortControls`

## Hooks

`useClickOutside` `useDismiss` `usePathname`
