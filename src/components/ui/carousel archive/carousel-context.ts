'use client';
import { createStatefulComponentContext } from '@/utils';
import { CarouselState } from './carousel.types';

export const [CarouselProvider, useCarouselContext] =
	createStatefulComponentContext<CarouselState>('Carousel');
