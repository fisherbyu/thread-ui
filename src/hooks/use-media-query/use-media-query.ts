'use client';
import { useState, useEffect } from 'react';

/**
 * Returns whether `query` currently matches, updating as the viewport changes.
 * Initializes as `false` on the server and before mount to avoid hydration mismatches.
 *
 * @example
 * const isWide = useMediaQuery('(min-width: 1024px)');
 */
export const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false); // Safe initial state

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const handleChange = () => setMatches(mediaQueryList.matches);

		// Set initial match after mount
		handleChange();

		mediaQueryList.addEventListener('change', handleChange);
		return () => mediaQueryList.removeEventListener('change', handleChange);
	}, [query]);

	return matches;
};
