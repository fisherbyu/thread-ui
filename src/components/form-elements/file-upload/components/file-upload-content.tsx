'use client';
import { css } from '@/styled-system/css';
import { FormLabel } from '../../form-label';
import { useFileUploadContext } from '../file-upload-context';
import { Divider, IconButton } from '@/components/ui';
import { FileInput } from './file-input';
import { FilePreview } from './item-previews';
import { FileUploadPreview } from './file-upload-preview';

export const FileUploadContent = () => {
	const {
		files,
		name,
		title,
		removeFile,
		saveFile,
		setAlt,
		preview,
		selectedFile,
		setCustomFilename,
		handleClearFile,
	} = useFileUploadContext();

	const styles = {
		container: css({
			width: '100%',
			padding: '1',
		}),
		fileWrapper: css({
			marginBottom: '2',
		}),
	};

	return (
		<div className={styles.container}>
			<FormLabel name={name} title={title} />
			<Divider width="100%" marginY="2px" />
			<div>
				{/* Current Files */}
				{files && (
					<div className={styles.fileWrapper}>
						{files.map((file, index) => (
							<FilePreview
								file={file}
								actions={
									<IconButton
										onClick={() => removeFile(index)}
										name="XSquare"
										size="md"
										color="error"
									/>
								}
							/>
						))}
					</div>
				)}
				{!selectedFile ? (
					<FileInput />
				) : (
					// Preview Selected File
					<FileUploadPreview />
				)}
			</div>
		</div>
	);
};
