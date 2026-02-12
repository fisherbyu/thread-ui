export type ThemeMode = 'light' | 'dark' | 'system';

export const THREAD_MODE_STORAGE_KEY = 'thread-mode' as const;

interface ThreadScriptProps {
	defaultMode?: ThemeMode;
}

/**
 * Inject this component into your <head> to prevent a flash of unstyled/wrong-mode content.
 * It runs synchronously before the first paint, reading the user's saved mode preference
 * from localStorage, falling back to defaultMode, and setting data-theme on :root.
 *
 * For 'system' mode (either saved or default), no data-theme is set and the CSS
 * media query (prefers-color-scheme) handles the correct mode natively.
 *
 * Usage:
 *   Next.js App Router — place in your root layout.tsx inside <head>
 *   Next.js Pages Router — place in _document.tsx inside <Head>
 *   Vite/CRA — place in index.html inside <head> using the raw script output
 */
export function ThreadScript({ defaultMode = 'system' }: ThreadScriptProps) {
	const scriptContent = buildScriptContent(defaultMode);

	return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />;
}

const buildScriptContent = (defaultMode: ThemeMode): string => {
	// The script is serialized to a string and injected inline.
	// Using string interpolation for defaultMode means no external fetch needed.
	// Wrapped in an IIFE to avoid polluting the global scope.
	return `(function(){
  try {
    var stored = localStorage.getItem('${THREAD_MODE_STORAGE_KEY}');
    var mode = (stored === 'light' || stored === 'dark' || stored === 'system')
      ? stored
      : '${defaultMode}';

    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // 'system' — remove any existing data-theme and let the CSS
      // prefers-color-scheme media query handle the correct mode
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {
    // localStorage may be unavailable (SSR, private browsing restrictions, etc.)
    // In that case the CSS default (light mode) will apply
  }
})();`;
};
