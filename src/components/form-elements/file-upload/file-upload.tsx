'use client';
import { useState } from 'react';
import { FileUploadProps, UploadableFile } from './file-upload.types';
import { FileUploadProvider } from './file-upload-context';
import { isFileImageType } from '@/utils';
import { FileUploadContent } from './components/file-upload-content';

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
	const [preview, setPreview] = useState<string | null>(null);
	const [status, setStatus] = useState('');

	// Init File States
	const [selectedFile, setSelectedFile] = useState<UploadableFile | null>(null);
	const [customFilename, setCustomFilename] = useState('');
	const [alt, setAlt] = useState('');

	// Validate File Type
	const isValidFileType = (file: File) => {
		if (allowedFileTypes.includes('*/*')) return true;
		return allowedFileTypes.some((type) => {
			// Handle wildcards like 'image/*'
			if (type.endsWith('/*')) {
				const category = type.split('/')[0];
				return file.type.startsWith(`${category}/`);
			}
			return file.type === type;
		});
	};

	// File Submissions
	const processFile = (file: File) => {
		// Ensure Maximum is not Exceeded
		if (maxNumberFiles && files.length >= maxNumberFiles) {
			setStatus(`Maximum files already added`);
			return;
		}

		// Ensure File is passed
		if (!file) {
			setStatus('No File Selected');
		}

		// Ensure Valid Type
		if (!isValidFileType(file)) {
			setStatus(`Invalid file type. Please select a ${allowedFileTypes.join(', ')} file`);
			return;
		}

		// Ensure Valid Size
		if (maxFileSize && file.size > maxFileSize) {
			setStatus(`File too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB`);
			return;
		}

		// Extract Original Filename for user Editing
		const extension = file.name.split('.').pop() || '';
		const originalName = file.name.replace(`.${extension}`, '');
		setCustomFilename(originalName);
		setSelectedFile(file);
		setStatus('');

		// Generate Image Preview
		if (isFileImageType(file)) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result;
				if (typeof result === 'string') {
					setPreview(result);
				}
			};
			reader.readAsDataURL(file);
		} else {
			// Clear preview for non-image files
			setPreview(null);
		}
	};

	// Remove File from files
	const handleClearFile = () => {
		setSelectedFile(null);
		setPreview(null);
		setCustomFilename('');
		setStatus('');
	};

	// Save Selected file
	const saveFile = () => {
		// Save File
		if (selectedFile) {
			selectedFile.alt = alt;
			setFiles([...files, selectedFile]);
			handleClearFile();
		}
	};

	const removeFile = (index: number) => {
		// Remove File @ index
		const updatedFiles = files.filter((_, i) => i !== index);

		// Save Changes
		setFiles(updatedFiles);
	};

	return (
		<FileUploadProvider
			value={{
				title,
				name,
				setFiles,
				allowedFileTypes,
				maxFileSize,
				maxNumberFiles,
				supportedFormatsText,
				required,
				size,
				isDragging,
				setIsDragging,
				preview,
				setPreview,
				status,
				setStatus,
				customFilename,
				setCustomFilename,
				alt,
				setAlt,
				files,
				selectedFile,
				setSelectedFile,
				processFile,
				handleClearFile,
				saveFile,
				removeFile,
			}}
		>
			<FileUploadContent />
		</FileUploadProvider>
	);
};
