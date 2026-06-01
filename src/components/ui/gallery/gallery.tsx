'use client';
import { useCallback, useEffect, useState } from 'react';
import { GalleryProps } from './gallery.types';
import useEmblaCarousel from 'embla-carousel-react';

export const Gallery = ({ title, items, itemWrapper }: GalleryProps) => {
	const [displayEmblaRef, displayEmblaApi] = useEmblaCarousel();
	const [emblaThumbnailStripRef, emblaThumbnailStripApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
	});

	const [selectedIndex, setSelectedIndex] = useState(0);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!displayEmblaApi || !emblaThumbnailStripApi) return;
			displayEmblaApi.scrollTo(index);
		},
		[displayEmblaApi, emblaThumbnailStripApi]
	);

	const onSelect = useCallback(() => {
		if (!displayEmblaApi || !emblaThumbnailStripApi) return;
		setSelectedIndex(displayEmblaApi.selectedScrollSnap());
		emblaThumbnailStripApi.scrollTo(displayEmblaApi.selectedScrollSnap());
	}, [displayEmblaApi, emblaThumbnailStripApi, setSelectedIndex]);

	useEffect(() => {
		if (!displayEmblaApi) return;
		onSelect();

		displayEmblaApi.on('select', onSelect).on('reInit', onSelect);
	}, [displayEmblaApi, onSelect]);

	return <></>;
};
