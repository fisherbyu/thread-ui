'use client';
import { css } from '@/styled-system/css';
import { InputWrapper } from '../../shared/input-wrapper';
import { useFileUploadContext } from '../file-upload-context';
import { Dropzone } from './dropzone';
import { FileItem } from './file-item';

const styles = {
	container: css({
		width: '100%',
		padding: '1',
	}),
	fileList: css({
		marginBottom: '2',
		display: 'flex',
		gap: '1',
		flexDirection: 'column',
		width: '100%',
	}),
	srOnly: css({ srOnly: true }),
};

/**
 * Layout for `FileUpload`: file list, dropzone, and the hidden form payload inside `InputWrapper`.
 * Reads everything from `FileUploadContext`.
 *
 * @example
 * <FileUploadProvider value={context}>
 *   <FileUploadContent />
 * </FileUploadProvider>
 */
export const FileUploadContent = () => {
	const {
		id,
		name,
		title,
		emptyTitle,
		size,
		disabled,
		divider,
		items,
		remoteFiles,
		isFull,
		message,
		meta,
		inputProps,
		getKey,
	} = useFileUploadContext();

	const displayTitle = items.length === 0 ? (emptyTitle ?? title) : title;

	return (
		<div className={styles.container}>
			<InputWrapper
				id={id}
				title={displayTitle}
				size={size}
				divider={divider}
				error={message}
			>
				{items.length > 0 && (
					<div className={styles.fileList}>
						{items.map((item) => (
							<FileItem key={getKey(item)} item={item} />
						))}
					</div>
				)}
				{!isFull && <Dropzone />}

				{/* Form payload; existing ids render before the file input so `getAll(name)` lines up with the metadata */}
				{name &&
					remoteFiles.map((file) => (
						<input
							key={file.id ?? file.src}
							type="hidden"
							name={name}
							value={file.id ?? file.src}
							disabled={disabled}
						/>
					))}
				{/* Always mounted, even when full, so new files keep submitting */}
				<input {...inputProps} tabIndex={-1} aria-hidden className={styles.srOnly} />
				{name && (
					<input type="hidden" name={`${name}Meta`} value={meta} disabled={disabled} />
				)}
			</InputWrapper>
		</div>
	);
};
