import { createComponentContext } from '@/utils';
import { LightboxProps, LightboxState } from './lightbox.types';

export const [LightboxProvider, useLightboxContext] =
	createComponentContext<LightboxState>('Lightbox');
