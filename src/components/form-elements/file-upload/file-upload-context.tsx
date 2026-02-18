import { createComponentContext } from '@/utils';
import { FileUploadProps } from './file-upload.types';

export const [FileUploadProvider, useFileUploadContext] =
	createComponentContext<FileUploadProps>('FileUpload');
