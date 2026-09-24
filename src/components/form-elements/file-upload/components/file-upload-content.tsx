'use client';
import { css } from '@/styled-system/css';
import { FormLabel } from '../../shared/form-label';
import { InputWrapper } from '../../shared/input-wrapper';
import { useFileUploadContext } from '../file-upload-context';
import { Divider } from '@/components/ui';
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
	}),
	srOnly: css({ srOnly: true }),
};

/**
 * Layout for `FileUpload`: label, file list, dropzone, and the hidden form payload.
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
			<InputWrapper id={id} error={message} size={size}>
				{displayTitle && <FormLabel id={id} title={displayTitle} size={size} />}
				<Divider width="100%" marginY="2px" />
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
