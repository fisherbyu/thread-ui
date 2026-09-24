'use client';
import { FileUploadProps } from './file-upload.types';
import { FileUploadProvider } from './file-upload-context';
import { FileUploadContent } from './components/file-upload-content';
import { useFileUpload } from './use-file-upload';
import { describeFormats } from './file-upload.utils';
import { useInputId } from '../shared/use-input-id';

/**
 * File upload component with drag-and-drop, validation, previews, and optional renaming (plus alt text for images).
 * Accepts existing files as `{ src, name }` alongside new `File`s, so it works for edit forms.
 * Controlled when `value` is passed, uncontrolled otherwise.
 *
 * On submit, `formData.getAll(name)` holds kept existing ids followed by new `File`s,
 * and `${name}Meta` holds a JSON array of per-file metadata in the same order.
 *
 * @example
 * <FileUpload
 *   name="attachments"
 *   value={value}
 *   onChange={onChange}
 *   accept="image/*,.pdf"
 *   maxSize={5 * 1024 * 1024}
 *   maxFiles={3}
 * />
 *
 * @example
 * <FileUpload name="photos" defaultValue={[{ id: 'img_1', src: '/photos/1.jpg', name: 'beach.jpg' }]} editMode="on-add" />
 */
export const FileUpload = ({
	title = 'Upload a File',
	emptyTitle,
	name,
	id: idProp,
	value,
	defaultValue,
	onChange,
	accept,
	maxSize,
	maxFiles,
	supportedFormatsText,
	required,
	disabled,
	error,
	size = 'md',
	editMode = 'on-demand',
}: FileUploadProps) => {
	const id = useInputId(idProp, name);

	const upload = useFileUpload({
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
	});

	return (
		<FileUploadProvider
			value={{
				...upload,
				id,
				name,
				title,
				emptyTitle,
				size,
				disabled,
				editMode,
				maxFiles,
				formatsText: supportedFormatsText ?? describeFormats(accept, maxSize),
			}}
		>
			<FileUploadContent />
		</FileUploadProvider>
	);
};
