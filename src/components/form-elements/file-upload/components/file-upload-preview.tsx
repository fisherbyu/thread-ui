'use client';
import { isFileImageType } from '@/utils';
import { TextInput } from '../../text-input';
import { useFileUploadContext } from '../file-upload-context';
import { FilePreview, ImageDisplay } from './item-previews';
import { Button } from '@/components/ui';
import { css } from '@/styled-system/css';
import { Text } from '@/components/typography';

export const FileUploadPreview = () => {
	const {
		selectedFile,
		preview,
		customFilename,
		setCustomFilename,
		alt,
		setAlt,
		handleClearFile,
		saveFile,
	} = useFileUploadContext();

	if (!selectedFile) {
		return;
	}

	const styles = {
		container: css({
			display: 'flex',
			gap: '4',
			flexDirection: 'column',
			width: '100%',
			marginX: 'auto',
			justifyContent: {
				base: 'normal',
				md: 'space-between',
			},
			alignItems: 'center',
		}),
		contents: css({
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'start',
			gap: '2',
		}),
		item: css({
			width: '100%',
		}),
		actionBlock: css({
			alignSelf: 'flex-end',
			display: 'flex',
			gap: '3',
			flexDirection: 'column',
		}),
		actionContent: css({
			display: 'flex',
			gap: '2',
		}),
	};

	return (
		<div className={styles.container}>
			{preview ? <ImageDisplay src={preview} /> : <FilePreview file={selectedFile} />}
			<div className={styles.contents}>
				<div className={styles.item}>
					<TextInput
						name="filename"
						title="Filename:"
						value={customFilename}
						onChange={(e) => setCustomFilename(e.target.value)}
						required
					/>
					<Text color="text-secondary" size="xs">
						Extension: .{selectedFile.name.split('.').pop()}
					</Text>
				</div>
				{isFileImageType(selectedFile) && (
					<div className={styles.item}>
						<TextInput
							name="alt"
							title="Alt Text:"
							value={alt}
							onChange={(e) => setAlt(e.target.value)}
						/>
					</div>
				)}
			</div>
			<div className={styles.actionBlock}>
				<div className={styles.actionContent}>
					<>
						<Button type="button" color="error" onClick={handleClearFile}>
							Remove
						</Button>
						<Button type="button" onClick={saveFile} fullWidth>
							Add File
						</Button>
					</>
				</div>
			</div>
		</div>
	);
};
