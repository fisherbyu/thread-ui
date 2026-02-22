import { Text } from '@/components/typography';
import { Icon, IconButton } from '@/components/ui';
import { css } from '@/styled-system/css';
import { isFileImageType } from '@/utils';
import { ReactNode } from 'react';

export type ImageDisplayProps = {
	src: string;
	action?: () => void;
};

export const ImageDisplay = ({ src, action }: ImageDisplayProps) => {
	const styles = {
		image: css({
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			borderRadius: 'md',
			maxHeight: '6rem',
			maxWidth: '6rem',
		}),
		wrapper: css({
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			gap: '3',
		}),
	};

	const fixedImageStyles = {
		height: 'auto',
		width: 'auto',
		maxWidth: '256px',
		maxHeight: '400px',
	};

	if (action) {
		return (
			<div className={styles.wrapper}>
				<img src={src} alt="Preview" className={styles.image} />
				<IconButton onClick={action} name="XSquare" size="md" color="error" />
			</div>
		);
	}

	return <img src={src} alt="Preview" className={styles.image} style={fixedImageStyles} />;
};

export type FilePreviewProps = {
	file: File;
	actions?: ReactNode;
};

export const FilePreview = ({ file, actions }: FilePreviewProps) => {
	const styles = {
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
			gap: '2',
		}),
		content: css({
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		}),
	};
	return (
		<div className={styles.container}>
			<div className={styles.innerWrapper}>
				<Icon name={isFileImageType(file) ? 'Image' : 'FileText'} size={48} color="gray" />
				<div className={styles.content}>
					<Text size="sm">{file.name}</Text>
					<Text size="xs" color="text-secondary">
						{(file.size / 1024).toFixed(1)} KB
					</Text>
				</div>
			</div>
			{actions && actions}
		</div>
	);
};
