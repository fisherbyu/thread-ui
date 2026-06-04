'use client';
import { createStatefulComponentContext, createComponentContext } from '@/utils';
import { GalleryState, GalleryEmblaContext } from './gallery.types';

export const [GalleryProvider, useGalleryContext] =
	createStatefulComponentContext<GalleryState>('Gallery');

export const [GalleryEmblaProvider, useGalleryEmblaContext] =
	createComponentContext<GalleryEmblaContext>('GalleryEmbla');
