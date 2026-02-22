'use client';
import { useCallback } from 'react';
import { Icon } from '@/components/ui';
import { useFileUploadContext } from '../file-upload-context';
import { css, cva, cx } from '@/styled-system/css';
import { Text } from '@/components/typography';

// Styles
const styles = {
	dropzone: cva({
		base: {
			border: '2px dashed',
			mx: 'auto',
			rounded: 'lg',
			textAlign: 'center',
			display: 'flex',
			alignItems: 'center',
			borderColor: 'gray.300',
		},
		variants: {
			size: {
				sm: { flexDirection: 'row', justifyContent: 'center', gap: '7', p: '3' },
				md: { flexDirection: 'row', justifyContent: 'center', gap: '7', p: '8' },
				lg: { flexDirection: 'column', p: '8' },
			},
		},
	}),
	isDragging: css({ borderColor: 'blue.500', bg: 'surface' }),
	contents: cva({
		base: {
			display: 'flex',
			gap: '2',
			flexDirection: 'column',
			alignItems: 'center',
		},
		variants: {
			size: {
				sm: { flexDirection: 'row' },
				md: {},
				lg: {},
			},
		},
	}),
	button: cva({
		base: {
			color: 'info.main',
			_hover: { textDecoration: 'underline' },
		},
		variants: {
			size: {
				sm: { fontSize: 'xs' },
				md: {},
				lg: {},
			},
		},
	}),
	input: css({
		display: 'none',
	}),
};

export const FileInput = () => {
	// Extract Context
	const {
		id,
		allowedFileTypes,
		value,
		maxNumberFiles,
		isDragging,
		required,
		setIsDragging,
		size,
		status,
		supportedFormatsText,
		processFile,
	} = useFileUploadContext();

	// Drag UI Reactions
	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		processFile(file);
	}, []);
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			processFile(file);
		}
	};

	// If Maximum FIles Reached, return empty
	if (maxNumberFiles !== undefined && value.length >= maxNumberFiles) {
		return;
	}

	return (
		<div
			className={cx(styles.dropzone({ size }), isDragging && styles.isDragging)}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<Icon name="UploadSimple" size={size === 'sm' ? 24 : 48} color="gray" />
			<div className={styles.contents({ size })}>
				<span>
					{!(size === 'sm') && <Text align="center">Drag and drop your file here</Text>}
					{supportedFormatsText && (
						<Text align="center" color="text-secondary" size="xxs">
							{supportedFormatsText}
						</Text>
					)}
					{status && (
						<Text align="center" color="error" size="xxs">
							{status}
						</Text>
					)}
				</span>
				<input
					type="file"
					id={id}
					className={styles.input}
					accept={allowedFileTypes?.join(',')}
					onChange={handleFileUpload}
					required={required}
				/>
				<button
					className={styles.button({ size })}
					type="button"
					onClick={() => {
						const fileInput = document.getElementById('file-upload-input');
						if (fileInput) {
							fileInput.click();
						}
					}}
				>
					Select a File
				</button>
			</div>
		</div>
	);
};
