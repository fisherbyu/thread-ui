import { ThreadMode, THREAD_MODE_STORAGE_KEY, VALID_MODES } from './theme-mode';

export type { ThreadMode };

interface ThreadScriptProps {
	defaultMode?: ThreadMode;
}

/**
 * Inline script to prevent flash of wrong-mode content on first paint.
 * Reads the user's saved mode from localStorage and sets `data-theme` on `:root`
 * before React hydrates. For `'system'` mode, no attribute is set and the
 * `prefers-color-scheme` media query handles it natively.
 *
 * Add `suppressHydrationWarning` to your `<html>` tag to suppress the expected hydration mismatch.
 *
 * @example
 * // Next.js App Router (layout.tsx)
 *  <html suppressHydrationWarning>
 *      <head>
 *          <ThreadScript defaultMode="system" />
 *      </head>
 *      <body>{children}</body>
 *  </html>
 * @example
 * // Next.js Pages Router (_document.tsx)
 * <Head><ThreadScript defaultMode="system" /></Head>
 */
export function ThreadScript({ defaultMode = 'system' }: ThreadScriptProps) {
	const scriptContent = buildScriptContent(defaultMode);

	return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

const buildScriptContent = (defaultMode: ThreadMode): string => {
	// Serialized as an IIFE so it doesn't pollute the global scope.
	// defaultMode and the storage key are interpolated at render time on the server.
	return `(function(){
  try {
    var stored = localStorage.getItem('${THREAD_MODE_STORAGE_KEY}');
    var validModes = ${JSON.stringify(VALID_MODES)};
    var mode = validModes.indexOf(stored) !== -1 ? stored : '${defaultMode}';

    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {
    // localStorage unavailable — CSS default (light mode) applies
  }
})();`;
};
