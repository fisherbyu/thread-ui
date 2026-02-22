'use client';
import { createComponentContext } from '@/utils';
import { ModalProps } from './modal.types';

export const [ModalProvider, useModalContext] = createComponentContext<ModalProps>('Modal');
