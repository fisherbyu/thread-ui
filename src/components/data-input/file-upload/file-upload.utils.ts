import { FileUploadItem, RemoteFile, UploadableFile } from './file-upload.types';

const imageExtensions = /\.(png|jpe?g|gif|webp|avif|svg|bmp|ico)$/i;

const wildcardLabels: Record<string, string> = {
	image: 'Images',
	video: 'Videos',
	audio: 'Audio',
	text: 'Text files',
};

/** Narrows an item to an existing, server-side file. */
export const isRemoteFile = (item: FileUploadItem): item is RemoteFile => !(item instanceof File);

/** Whether an item is an image, by MIME type or, for remote files without one, by extension. */
export const isImageItem = (item: FileUploadItem) => {
	if (item.type) return item.type.startsWith('image/');
	const path = isRemoteFile(item) ? item.src.split(/[?#]/)[0] : '';
	return imageExtensions.test(item.name) || imageExtensions.test(path);
};

/** Splits a filename into its base and extension. The extension keeps its dot; dotfiles like `.env` have none. */
export const splitFileName = (name: string) => {
	const dot = name.lastIndexOf('.');
	if (dot <= 0) return { base: name, extension: '' };
	return { base: name.slice(0, dot), extension: name.slice(dot) };
};

/** Whether a file matches a native `accept` string (MIME types, `type/*` wildcards, or `.ext`). */
export const matchesAccept = (file: File, accept?: string) => {
	if (!accept) return true;
	const name = file.name.toLowerCase();
	const type = file.type.toLowerCase();

	return accept
		.split(',')
		.map((token) => token.trim().toLowerCase())
		.filter(Boolean)
		.some((token) => {
			if (token === '*' || token === '*/*') return true;
			if (token.startsWith('.')) return name.endsWith(token);
			if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1));
			return type === token;
		});
};

/** Human-readable size, e.g. `5 MB` or `512 KB`. */
export const formatBytes = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`;
	const units = ['KB', 'MB', 'GB'];
	let value = bytes / 1024;
	let unit = 0;
	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024;
		unit++;
	}
	return `${Number(value.toFixed(1))} ${units[unit]}`;
};

/** Default supported-formats text from `accept` and `maxSize`, e.g. `Images, PDF up to 5 MB`. */
export const describeFormats = (accept?: string, maxSize?: number) => {
	const types = (accept ?? '')
		.split(',')
		.map((token) => token.trim())
		.filter((token) => token && token !== '*' && token !== '*/*')
		.map((token) => {
			if (token.startsWith('.')) return token.slice(1).toUpperCase();
			const [category, subtype = ''] = token.split('/');
			if (subtype === '*') return wildcardLabels[category] ?? `${category} files`;
			// `svg+xml` → `SVG`, `vnd.ms-excel` → `MS-EXCEL`
			return (subtype.split('+')[0].split('.').pop() ?? subtype).toUpperCase();
		});

	const typeText = types.join(', ');
	if (!maxSize) return typeText || undefined;
	return typeText ? `${typeText} up to ${formatBytes(maxSize)}` : `Up to ${formatBytes(maxSize)}`;
};

/** Copy of a file with a new name and/or alt text; the file's contents are reused, not copied. */
export const withFileMeta = (file: UploadableFile, meta: { name?: string; alt?: string }) => {
	const next: UploadableFile = new File([file], meta.name ?? file.name, {
		type: file.type,
		lastModified: file.lastModified,
	});
	next.alt = meta.alt ?? file.alt;
	return next;
};
