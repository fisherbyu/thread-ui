'use client';
import { useState, useEffect } from 'react';

const LOCATION_CHANGE_EVENT = 'thread:locationchange';

/**
 * Client-side routers (Next.js, React Router, etc.) navigate with `history.pushState` /
 * `replaceState`, which don't fire `popstate`. Wrap them once so we can hear those navigations too.
 */
const patchHistory = () => {
	const history = window.history as History & { __threadPatched?: boolean };
	if (history.__threadPatched) return;
	history.__threadPatched = true;

	for (const method of ['pushState', 'replaceState'] as const) {
		const original = history[method].bind(history);
		history[method] = (...args: Parameters<History['pushState']>) => {
			original(...args);
			window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
		};
	}
};

/**
 * Returns the current `window.location.pathname`, updating on back/forward (`popstate`)
 * and client-side navigations (`history.pushState` / `replaceState`).
 * Initializes as an empty string on the server to avoid hydration mismatches.
 *
 * @example
 * const pathname = usePathname();
 */
export const usePathname = () => {
	const [pathname, setPathname] = useState(''); // Safe initial state

	useEffect(() => {
		patchHistory();

		const handleLocationChange = () => {
			setPathname(window.location.pathname);
		};

		// Set initial pathname after mount
		handleLocationChange();

		window.addEventListener('popstate', handleLocationChange);
		window.addEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);
		return () => {
			window.removeEventListener('popstate', handleLocationChange);
			window.removeEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);
		};
	}, []);

	return pathname;
};
