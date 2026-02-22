'use client';
import { css } from '@/styled-system/css';
import { FormLabel } from '../../form-label';
import { useFileUploadContext } from '../file-upload-context';
import { Divider, IconButton } from '@/components/ui';
import { FileInput } from './file-input';
import { FilePreview } from './item-previews';
import { FileUploadPreview } from './file-upload-preview';

export const FileUploadContent = () => {
	const { value, name, title, removeFile, selectedFile } = useFileUploadContext();

	const styles = {
		container: css({
			width: '100%',
			padding: '1',
		}),
		fileWrapper: css({
			marginBottom: '2',
			display: 'flex',
			gap: '1',
			flexDirection: 'column',
		}),
	};

	return (
		<div className={styles.container}>
			<FormLabel name={name} title={title} />
			<Divider width="100%" marginY="2px" />
			<div>
				{/* Current Files */}
				{value && (
					<div className={styles.fileWrapper}>
						{value.map((file, index) => (
							<FilePreview
								key={index}
								file={file}
								actions={
									<IconButton
										onClick={() => removeFile(index)}
										name="XSquare"
										size="sm"
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
