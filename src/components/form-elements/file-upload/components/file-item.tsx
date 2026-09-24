'use client';
import { useEffect, useState } from 'react';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';
import { Text } from '@/components/typography';
import { TextInput } from '../../text-input';
import { useFileUploadContext } from '../file-upload-context';
import { FileUploadItem } from '../file-upload.types';
import { isImageItem, isRemoteFile, splitFileName } from '../file-upload.utils';
import { FilePreview } from './item-previews';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'column',
		gap: '2',
		width: '100%',
	}),
	actions: css({
		display: 'flex',
		gap: '1',
	}),
	editor: css({
		display: 'flex',
		flexDirection: 'row',
		gap: '2',
		paddingX: '5',
	}),
	field: css({
		width: '100%',
	}),
};

/** Props for `FileItem`. */
type FileItemProps = {
	item: FileUploadItem;
};

/**
 * Row in the `FileUpload` list: preview, remove, and, for new files, an inline editor for the name
 * (and alt text for images). Editor fields have no `name`, so they never submit with the form.
 *
 * @example
 * {items.map((item) => <FileItem key={getKey(item)} item={item} />)}
 */
export const FileItem = ({ item }: FileItemProps) => {
	const { id, size, disabled, editMode, focusKey, getKey, removeItem, updateItem } =
		useFileUploadContext();

	const key = getKey(item);
	const editable = editMode !== 'none' && !isRemoteFile(item) && !disabled;
	const { base, extension } = splitFileName(item.name);

	const [isEditing, setIsEditing] = useState(editable && editMode === 'on-add');
	// Draft can be empty while typing; the file keeps the original base name until it isn't
	const [draftName, setDraftName] = useState(base);
	const [originalBase] = useState(base);

	const fieldId = `${id}-${key}`;

	// `on-add` moves focus to the first new file's name field
	useEffect(() => {
		if (isEditing && key === focusKey) {
			document.getElementById(`${fieldId}-name`)?.focus();
		}
	}, []);

	const handleNameChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const next = e.target.value;
		setDraftName(next);
		updateItem(key, { name: `${next.trim() || originalBase}${extension}` });
	};

	const handleAltChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		updateItem(key, { alt: e.target.value });
	};

	return (
		<div className={styles.container}>
			<FilePreview
				item={item}
				actions={
					<div className={styles.actions}>
						{editable && (
							<IconButton
								ariaLabel={
									isEditing ? `Done editing ${item.name}` : `Edit ${item.name}`
								}
								onClick={() => setIsEditing((prev) => !prev)}
								name={isEditing ? 'Check' : 'PencilSimple'}
								size="sm"
								color="text"
							/>
						)}
						<IconButton
							ariaLabel={`Remove ${item.name}`}
							onClick={() => removeItem(key)}
							name="XSquare"
							size="sm"
							color="error"
							disabled={disabled}
						/>
					</div>
				}
			/>
			{editable && isEditing && !isRemoteFile(item) && (
				<div className={styles.editor}>
					<div className={styles.field}>
						<TextInput
							id={`${fieldId}-name`}
							title="Filename"
							value={draftName}
							onChange={handleNameChange}
							size={size}
						/>
						{extension && (
							<Text color="text-secondary" size="xs">
								Extension: {extension}
							</Text>
						)}
					</div>
					{isImageItem(item) && (
						<div className={styles.field}>
							<TextInput
								id={`${fieldId}-alt`}
								title="Alt Text"
								value={item.alt ?? ''}
								onChange={handleAltChange}
								size={size}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
