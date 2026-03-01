'use client';
import { useState, useEffect } from 'react';

/**
 * Returns the current `window.location.pathname` and updates on `popstate` events.
 * Initializes as an empty string on the server to avoid hydration mismatches.
 *
 * @example
 * const pathname = usePathname();
 */
export const usePathname = () => {
	const [pathname, setPathname] = useState(''); // Safe initial state

	useEffect(() => {
		// Set initial pathname after mount
		setPathname(window.location.pathname);

		const handleLocationChange = () => {
			setPathname(window.location.pathname);
		};

		window.addEventListener('popstate', handleLocationChange);
		return () => window.removeEventListener('popstate', handleLocationChange);
	}, []);

	return pathname;
};
