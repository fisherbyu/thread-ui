'use client';
import { useState, useEffect } from 'react';

export const usePathname = () => {
	const [pathname, setPathname] = useState(window.location.pathname);

	useEffect(() => {
		const handleLocationChange = () => {
			setPathname(window.location.pathname);
		};

		// Listen for popstate events (back/forward buttons)
		window.addEventListener('popstate', handleLocationChange);

		// For programmatic navigation, you'd need to dispatch custom events
		// when you change routes manually

		return () => window.removeEventListener('popstate', handleLocationChange);
	}, []);

	return pathname;
};
