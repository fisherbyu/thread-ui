'use client';
import { useState, useEffect } from 'react';

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
