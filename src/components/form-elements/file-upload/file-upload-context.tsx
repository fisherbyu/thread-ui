import { createComponentContext } from '@/utils';
import { FileUploadContext } from './file-upload.types';

export const [FileUploadProvider, useFileUploadContext] =
	createComponentContext<FileUploadContext>('FileUpload');
