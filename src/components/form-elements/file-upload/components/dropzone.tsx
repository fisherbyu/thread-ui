'use client';
import { useRef, useState } from 'react';
import { Button, Icon } from '@/components/ui';
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
			display: 'flex',
			alignItems: 'center',
			borderColor: 'structure.default',
			backgroundColor: 'inset',
			width: '100%',
		},
		variants: {
			size: {
				sm: { flexDirection: 'row', gap: '3', p: '2', textAlign: 'start', fontSize: 'xs' },
				md: { flexDirection: 'row', gap: '4', p: '4', textAlign: 'start' },
				lg: { flexDirection: 'column', gap: '2', p: '6', textAlign: 'center' },
			},
			isDragging: {
				true: { borderColor: 'info.main' },
			},
			disabled: {
				true: { opacity: '0.5', cursor: 'not-allowed' },
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}),
	// Column items align with the dropzone's text direction so the button doesn't stretch
	contents: cva({
		base: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5',
		},
		variants: {
			size: {
				sm: { alignItems: 'flex-start' },
				md: { alignItems: 'flex-start' },
				lg: { alignItems: 'center' },
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}),
	// Drag prompt is hidden in `sm` to keep the compact layout to the button and notes
	dragText: cva({
		variants: {
			size: {
				sm: { display: 'none' },
				md: {},
				lg: {},
			},
		},
		defaultVariants: {
			size: 'md',
		},
	}),
};

// Sized to roughly match the text block beside it so row layouts center evenly
const iconSizes = {
	sm: 24,
	md: 32,
	lg: 48,
} as const;

/**
 * Drag-and-drop target with a browse button and supported-formats notes for `FileUpload`.
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
			<Icon name="UploadSimple" size={iconSizes[size]} color="gray" />
			<div className={styles.contents({ size })}>
				<span className={styles.dragText({ size })}>
					<Text size={size == 'lg' ? 'md' : size} inline>
						{plural
							? 'Drag and Drop Your Files Here'
							: 'Drag and Drop Your File Here'}{' '}
					</Text>
				</span>
				<Button
					ref={browseRef}
					text
					size={size == 'lg' ? 'md' : size}
					onClick={openPicker}
					disabled={disabled}
					{...browseAriaProps}
					color="info"
				>
					{plural ? 'Select Files' : 'Select a File'}
				</Button>
				{formatsText && (
					<Text inline color="text-secondary" size="xxs">
						{formatsText}
					</Text>
				)}
			</div>
		</div>
	);
};
