'use client';
import { useEffect, useRef, useState } from 'react';
import { FileUploadItem, UploadableFile } from './file-upload.types';
import { useControllableState } from '../shared/use-controllable-state';
import { getErrorId, useFieldError } from '../shared/use-field-error';
import {
	formatBytes,
	isImageItem,
	isRemoteFile,
	matchesAccept,
	withFileMeta,
} from './file-upload.utils';

/** Options for `useFileUpload`. */
type UseFileUploadOptions = {
	id: string;
	name?: string;
	value?: FileUploadItem[];
	defaultValue?: FileUploadItem[];
	onChange?: (value: FileUploadItem[]) => void | Promise<void>;
	accept?: string;
	maxSize?: number;
	maxFiles?: number;
	required?: boolean;
	disabled?: boolean;
	error?: string;
};

/**
 * State and form wiring for `FileUpload`: controllable value, validation of picked files,
 * keys that survive renames, a native file input kept in sync via `DataTransfer`,
 * and the metadata JSON submitted alongside the files.
 *
 * @example
 * const upload = useFileUpload({ id, name, value, onChange, accept: 'image/*', maxFiles: 3 });
 */
export const useFileUpload = ({
	id,
	name,
	value,
	defaultValue,
	onChange,
	accept,
	maxSize,
	maxFiles,
	required,
	disabled,
	error,
}: UseFileUploadOptions) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const browseRef = useRef<HTMLButtonElement>(null);

	// Stable keys for new files; carried over when a rename creates a new `File`
	const keysRef = useRef(new WeakMap<File, string>());
	const keyCounter = useRef(0);

	const [items, setItems] = useControllableState<FileUploadItem[]>({
		value,
		defaultValue: defaultValue ?? [],
		onChange,
		elementRef: inputRef,
	});

	// Feedback for a rejected pick; describes the pick, not the value, so it never blocks submission
	const [status, setStatus] = useState<string | null>(null);
	// First file of the latest add, focused by its editor in `on-add` mode
	const [focusKey, setFocusKey] = useState<string | null>(null);

	const remoteFiles = items.filter(isRemoteFile);
	const newFiles = items.filter((item): item is UploadableFile => !isRemoteFile(item));
	const isFull = maxFiles !== undefined && items.length >= maxFiles;

	const getKey = (item: FileUploadItem) => {
		if (isRemoteFile(item)) return `remote-${item.id ?? item.src}`;
		let key = keysRef.current.get(item);
		if (!key) {
			key = `file-${keyCounter.current++}`;
			keysRef.current.set(item, key);
		}
		return key;
	};

	const syncInput = (files: File[]) => {
		const input = inputRef.current;
		if (!input) return;
		const transfer = new DataTransfer();
		files.forEach((file) => transfer.items.add(file));
		input.files = transfer.files;
	};

	// Mirror new files into the native input so they submit with the form and satisfy `required`.
	// Declared before `useFieldError` so validity is current when it refreshes
	useEffect(() => {
		syncInput(newFiles);
	}, [items]);

	const {
		ref,
		message: fieldMessage,
		validationProps,
		ariaProps,
	} = useFieldError({
		id,
		error,
		value: items.length,
		elementRef: inputRef,
		focusRef: browseRef,
	});

	const message = error || status || fieldMessage;

	const addFiles = (files: FileList | File[]) => {
		if (disabled) return;

		const accepted: UploadableFile[] = [];
		let rejection: string | null = null;
		let remaining = maxFiles === undefined ? Infinity : maxFiles - items.length;

		for (const file of Array.from(files)) {
			if (!matchesAccept(file, accept)) {
				rejection = `"${file.name}" isn't a supported file type`;
				continue;
			}
			if (maxSize !== undefined && file.size > maxSize) {
				rejection = `"${file.name}" is larger than ${formatBytes(maxSize)}`;
				continue;
			}
			if (remaining <= 0) {
				rejection = `You can add up to ${maxFiles} ${maxFiles === 1 ? 'file' : 'files'}`;
				continue;
			}
			accepted.push(file);
			remaining--;
		}

		setStatus(rejection);
		if (accepted.length === 0) return;

		setItems([...items, ...accepted]);
		setFocusKey(getKey(accepted[0]));
	};

	const removeItem = (key: string) => {
		setItems(items.filter((item) => getKey(item) !== key));
		setStatus(null);
	};

	const updateItem = (key: string, meta: { name?: string; alt?: string }) => {
		setItems(
			items.map((item) => {
				if (isRemoteFile(item) || getKey(item) !== key) return item;
				const next = withFileMeta(item, meta);
				keysRef.current.set(next, key);
				return next;
			})
		);
	};

	const openPicker = () => inputRef.current?.click();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const picked = Array.from(e.target.files ?? []);
		// The picker replaced the input's files; restore ours so rejected picks never submit
		syncInput(newFiles);
		addFiles(picked);
	};

	// Metadata ordered to match `formData.getAll(name)`: existing files render first, then the file input
	const meta = JSON.stringify([
		...remoteFiles.map((file) => ({ id: file.id ?? file.src })),
		...newFiles.map((file) => ({
			name: file.name,
			...(isImageItem(file) ? { alt: file.alt ?? '' } : {}),
		})),
	]);

	const inputProps = {
		ref,
		...validationProps,
		id,
		name,
		type: 'file' as const,
		accept,
		multiple: maxFiles !== 1,
		// Existing files can't live in a file input, so they satisfy `required` by switching it off
		required: required && remoteFiles.length === 0,
		disabled,
		onChange: handleInputChange,
	};

	const browseAriaProps = {
		'aria-invalid': ariaProps['aria-invalid'],
		'aria-describedby': message ? getErrorId(id) : undefined,
	};

	return {
		items,
		remoteFiles,
		isFull,
		focusKey,
		message,
		meta,
		inputProps,
		browseRef,
		browseAriaProps,
		getKey,
		addFiles,
		removeItem,
		updateItem,
		openPicker,
	};
};
