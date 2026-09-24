import { UtilitySizeOptions } from '@/types';
import { InputProps } from '../shared/input-props.types';
import type { useFileUpload } from './use-file-upload';

/** New file picked by the user, with optional alt text for images. */
export type UploadableFile = File & {
	/** Alt text for image files */
	alt?: string;
};

/** File that already exists on the server, previewed from `src` and submitted by `id`. */
export type RemoteFile = {
	/** URL used for the preview */
	src: string;
	/** Display name */
	name: string;
	/** Alt text for image files */
	alt?: string;
	/** Submitted with the form to mark the file as kept. Defaults to `src` */
	id?: string;
	/** MIME type; the extension in `name` or `src` is used when omitted */
	type?: string;
	/** Size in bytes, shown in the list when provided */
	size?: number;
};

/** Item in a `FileUpload` value: a new file or an existing one. */
export type FileUploadItem = UploadableFile | RemoteFile;

/** How new files can be renamed, plus alt text for images. */
export type FileEditMode = 'none' | 'on-demand' | 'on-add';

export type FileUploadProps = InputProps<FileUploadItem[], FileUploadItem[]> & {
	placeholder?: never;
	/** Label shown while no files are added. Defaults to `title` */
	emptyTitle?: string;
	/** Accepted types in native `accept` syntax, e.g. `image/*,.pdf` */
	accept?: string;
	/** Maximum file size in bytes */
	maxSize?: number;
	/** Maximum number of files, existing and new combined */
	maxFiles?: number;
	/** Text describing accepted files. Generated from `accept` and `maxSize` when omitted */
	supportedFormatsText?: string;
	/** `none` disables editing, `on-demand` adds an edit button, `on-add` opens the editor as files are added @default `on-demand` */
	editMode?: FileEditMode;
};

export type FileUploadContext = ReturnType<typeof useFileUpload> & {
	id: string;
	name?: string;
	title?: string;
	emptyTitle?: string;
	size: UtilitySizeOptions;
	disabled?: boolean;
	editMode: FileEditMode;
	maxFiles?: number;
	formatsText?: string;
};
