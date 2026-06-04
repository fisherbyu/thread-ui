'use client';
import { createComponentContext } from '@/utils';
import { ModalState } from './modal.types';

export const [ModalProvider, useModalContext] = createComponentContext<ModalState>('Modal');
