'use client';
import { useRef, useState } from 'react';
import { Icon } from '@/components/ui';
import { useFileUploadContext } from '../file-upload-context';
import { cva } from '@/styled-system/css';
import { Text } from '@/components/typography';

const styles = {
	dropzone: cva({
		base: {
			borderWidth: 'lg',
			borderStyle: 'dashed',
			mx: 'auto',
			rounded: 'lg',
			textAlign: 'center',
			display: 'flex',
			alignItems: 'center',
			borderColor: 'structure.default',
			backgroundColor: 'inset',
			width: '100%',
		},
		variants: {
			size: {
				sm: { flexDirection: 'row', justifyContent: 'center', gap: '7', p: '3' },
				md: { flexDirection: 'row', justifyContent: 'center', gap: '7', p: '8' },
				lg: { flexDirection: 'column', p: '8' },
			},
			isDragging: {
				true: { borderColor: 'info.main' },
			},
			disabled: {
				true: { opacity: '0.5', cursor: 'not-allowed' },
			},
		},
	}),
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
			cursor: 'pointer',
			_hover: { textDecoration: 'underline' },
			_disabled: { cursor: 'not-allowed', textDecoration: 'none' },
		},
		variants: {
			size: {
				sm: { fontSize: 'xs' },
				md: {},
				lg: {},
			},
		},
	}),
};

/**
 * Drag-and-drop target with a browse button for `FileUpload`.
 * The browse button is the focus target when validation fails and carries the error ARIA wiring.
 *
 * @example
 * {!isFull && <Dropzone />}
 */
export const Dropzone = () => {
	const {
		size,
		disabled,
		maxFiles,
		formatsText,
		browseRef,
		browseAriaProps,
		addFiles,
		openPicker,
	} = useFileUploadContext();

	const [isDragging, setIsDragging] = useState(false);
	// Counts nested `dragenter`/`dragleave` pairs so moving over children doesn't flicker the highlight
	const dragDepth = useRef(0);

	const plural = maxFiles !== 1;

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (disabled) return;
		dragDepth.current++;
		setIsDragging(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		// Required for the element to accept a drop
		e.preventDefault();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		dragDepth.current = Math.max(0, dragDepth.current - 1);
		if (dragDepth.current === 0) setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		dragDepth.current = 0;
		setIsDragging(false);
		if (!disabled) addFiles(e.dataTransfer.files);
	};

	return (
		<div
			className={styles.dropzone({ size, isDragging, disabled: !!disabled })}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<Icon name="UploadSimple" size={size === 'sm' ? 24 : 48} color="gray" />
			<div className={styles.contents({ size })}>
				<span>
					{size !== 'sm' && (
						<Text align="center">
							{plural
								? 'Drag and drop your files here'
								: 'Drag and drop your file here'}
						</Text>
					)}
					{formatsText && (
						<Text align="center" color="text-secondary" size="xxs">
							{formatsText}
						</Text>
					)}
				</span>
				<button
					ref={browseRef}
					className={styles.button({ size })}
					type="button"
					onClick={openPicker}
					disabled={disabled}
					{...browseAriaProps}
				>
					{plural ? 'Select Files' : 'Select a File'}
				</button>
			</div>
		</div>
	);
};
