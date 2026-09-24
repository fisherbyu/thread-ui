'use client';
import { Text } from '@/components/typography';
import { Icon, IconButton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { ReactNode } from 'react';
import { FileUploadItem } from '../file-upload.types';
import { formatBytes, isImageItem, isRemoteFile } from '../file-upload.utils';
import { useObjectUrl } from '../use-object-url';

const styles = {
	image: css({
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: 'md',
		maxHeight: '24',
		maxWidth: '24',
	}),
	wrapper: css({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: '3',
	}),
	container: css({
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 'md',
		backgroundColor: 'gray.light',
		paddingY: '2',
		paddingX: '5',
	}),
	innerWrapper: css({
		display: 'flex',
		alignItems: 'center',
		gap: '2',
		minWidth: '0',
	}),
	thumbnail: css({
		width: '12',
		height: '12',
		flexShrink: '0',
		objectFit: 'cover',
		borderRadius: 'md',
	}),
	content: css({
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	}),
};

const fixedImageStyles = {
	height: 'auto',
	width: 'auto',
	maxWidth: '64',
	maxHeight: '100',
};

export type ImageDisplayProps = {
	src: string;
	/** Image description; empty marks it decorative @default `''` */
	alt?: string;
	action?: () => void;
};

/**
 * Standalone image preview with an optional remove action.
 *
 * @example
 * <ImageDisplay src={url} alt="Team photo" action={handleRemove} />
 */
export const ImageDisplay = ({ src, alt = '', action }: ImageDisplayProps) => {
	if (action) {
		return (
			<div className={styles.wrapper}>
				<img src={src} alt={alt} className={styles.image} />
				<IconButton onClick={action} name="XSquare" size="md" color="error" />
			</div>
		);
	}

	return <img src={src} alt={alt} className={styles.image} style={fixedImageStyles} />;
};

export type FilePreviewProps = {
	/** New `File` or existing `{ src, name }` file */
	item: FileUploadItem;
	actions?: ReactNode;
};

/**
 * File row showing a thumbnail for images (object URL for new files, `src` for existing ones)
 * or a generic icon otherwise, with name, size when known, and optional actions.
 *
 * @example
 * <FilePreview item={file} actions={<IconButton name="XSquare" onClick={remove} />} />
 */
export const FilePreview = ({ item, actions }: FilePreviewProps) => {
	const isRemote = isRemoteFile(item);
	const isImage = isImageItem(item);
	const objectUrl = useObjectUrl(!isRemote && isImage ? item : null);
	const thumbnail = isImage ? (isRemote ? item.src : objectUrl) : null;
	const size = isRemote ? item.size : item.size;

	return (
		<div className={styles.container}>
			<div className={styles.innerWrapper}>
				{thumbnail ? (
					<img src={thumbnail} alt={item.alt ?? ''} className={styles.thumbnail} />
				) : (
					<Icon name={isImage ? 'Image' : 'FileText'} size={48} color="gray" />
				)}
				<div className={styles.content}>
					<Text inline size="sm" weight="medium">
						{item.name}
					</Text>
					{size !== undefined && (
						<Text inline size="xs" color="text-secondary">
							{formatBytes(size)}
						</Text>
					)}
				</div>
			</div>
			{actions}
		</div>
	);
};
