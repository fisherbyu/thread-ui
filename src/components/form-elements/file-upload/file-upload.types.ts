export type UploadableFile = File & {
	/** Alt text for image files */
	alt?: string;
};

export type FileUploadProps = {
	/** Defaults to `name` if not provided */
	id?: string;
	/** Heading displayed in the upload area @default `'Upload a File'` */
	title?: string;
	/** Form field name */
	name: string;
	/** Current list of uploaded files */
	files: UploadableFile[];
	/** Called with the updated file list when files are added or removed */
	onChange: (files: UploadableFile[]) => Promise<void> | void;
	/** MIME types accepted. Supports wildcards like `image/*` @default `['*\/*']` */
	allowedFileTypes?: string[];
	/** Maximum file size in bytes */
	maxFileSize?: number;
	/** Maximum number of files that can be uploaded */
	maxNumberFiles?: number;
	/** Custom text describing supported formats, shown in the upload area */
	supportedFormatsText?: string;
	required?: boolean;
	/** Controls the size of the upload area @default `'md'` */
	size?: 'sm' | 'md' | 'lg';
};

export type FileUploadContext = FileUploadProps & {
	// State
	isDragging: boolean;
	selectedFile: UploadableFile | null;
	preview: string | null;
	status: string;
	customFilename: string;
	alt: string;

	// State setters
	setIsDragging: (isDragging: boolean) => void;
	setSelectedFile: (file: UploadableFile | null) => void;
	setPreview: (preview: string | null) => void;
	setStatus: (status: string) => void;
	setCustomFilename: (filename: string) => void;
	setAlt: (alt: string) => void;

	// Actions/handlers
	processFile: (file: File) => void;
	handleClearFile: () => void;
	saveFile: () => void;
	removeFile: (index: number) => void;
};
