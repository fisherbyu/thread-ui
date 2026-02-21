'use client';
import { createComponentContext } from '@/utils';
import { ModalProps } from './modal.types';

export const [ModalProvider, useModalProvider] = createComponentContext<ModalProps>('Modal');
