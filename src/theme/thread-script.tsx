import { ThreadMode, THREAD_MODE_STORAGE_KEY, VALID_MODES } from './theme-mode';

export type { ThreadMode };

interface ThreadScriptProps {
	defaultMode?: ThreadMode;
}

/**
 * Inject this component into your <head> to prevent a flash of unstyled/wrong-mode content.
 * It runs synchronously before the first paint, reading the user's saved mode preference
 * from localStorage, falling back to defaultMode, and setting data-theme on :root.
 *
 * For 'system' mode (either saved or default), no data-theme is set and the CSS
 * media query (prefers-color-scheme) handles the correct mode natively.
 *
 * Add suppressHydrationWarning to your <html> tag — the inline script mutates
 * data-theme before React hydrates, which causes an expected mismatch warning.
 *
 * Next.js App Router:
 *   <html suppressHydrationWarning>
 *     <head><ThreadScript defaultMode="system" /></head>
 *
 * Next.js Pages Router:
 *   // _document.tsx <Head><ThreadScript defaultMode="system" /></Head>
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
