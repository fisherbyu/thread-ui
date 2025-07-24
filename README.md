# Thread UI

Thread is a UI Library I created for use in my [personal website](http://fisherandrew.org).

# Get Started

All components work out of the box. Documentation coming soon to thread.fisherandrew.org

# Features

## SSR

All CSS is pre-generated using `panda-css`, so most components can easily be rendered server-side.

## Custom Themes

Thread-UI supports custom themes created by the user that override the default theme, even when using SSR in Next.js. To implement a custom theme, simply wrap the application contents in the `ThemeProvider` Component. The provider can be configured with a partial of the `Theme` type, to allow you to customize as much or as little as you want!

For Example:

```
const ThreadTheme: ThemeConfig = {
    primary: {
        light: '#4f46e5',
        main: '#4338ca',
        dark: '#3730a3',
    },
};
return <ThemeProvider theme={ThreadTheme}>{children}</ThemeProvider>;
```
