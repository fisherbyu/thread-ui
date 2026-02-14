import { useState } from 'react';
import { FileUploadProps } from './file-upload.types';

export const FileUpload = ({
	title = 'Upload a File',
	name,
	files,
	setFiles,
	allowedFileTypes = ['*/*'],
	maxFileSize,
	maxNumberFiles,
	supportedFormatsText,
	required,
	size = 'md',
}: FileUploadProps) => {
	// Init Display States
	const [isDragging, setIsDragging] = useState(false);
	const [preview, setPreview] = useState<string | undefined>(undefined);
	const [status, setStatus] = useState('');

	return <></>;
};
