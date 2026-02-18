export type FileUploadProps = {
	title?: string;
	name: string;
	files: UploadableFile[];
	setFiles: (files: UploadableFile[]) => Promise<void> | void;
	allowedFileTypes?: string[];
	maxFileSize?: number; // in bytes
	maxNumberFiles?: number;
	supportedFormatsText?: string;
	required?: boolean;
	size?: 'sm' | 'md' | 'lg';
};

export type UploadableFile = File & {
	alt?: string;
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
