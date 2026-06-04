'use client';
import { createStatefulComponentContext, createComponentContext } from '@/utils';
import { CarouselState, CarouselEmblaContext } from './carousel.types';

export const [CarouselProvider, useCarouselContext] =
	createStatefulComponentContext<CarouselState>('Carousel');

export const [CarouselEmblaProvider, useCarouselEmblaContext] =
	createComponentContext<CarouselEmblaContext>('CarouselEmbla');
