'use client';
import { useEffect, useState } from 'react';

/**
 * Object URL for previewing a `File`, revoked when the file changes or the component unmounts.
 * Returns `null` while no file is given.
 *
 * @example
 * const url = useObjectUrl(file);
 * return url && <img src={url} alt="" />;
 */
export const useObjectUrl = (file: File | null) => {
	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!file) {
			setUrl(null);
			return;
		}
		const next = URL.createObjectURL(file);
		setUrl(next);
		return () => URL.revokeObjectURL(next);
	}, [file]);

	return url;
};
