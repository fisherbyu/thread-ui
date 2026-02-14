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
