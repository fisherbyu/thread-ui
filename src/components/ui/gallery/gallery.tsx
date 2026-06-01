'use client';
import { useCallback, useEffect, useState } from 'react';
import { GalleryProps } from './gallery.types';
import useEmblaCarousel from 'embla-carousel-react';

export const Gallery = ({ title, items, itemWrapper }: GalleryProps) => {
	const [emblaDisplayRef, emblaDisplayApi] = useEmblaCarousel();
	const [emblaThumbnailStripRef, emblaThumbnailStripApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
	});

	const [selectedIndex, setSelectedIndex] = useState(0);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaDisplayApi || !emblaThumbnailStripApi) return;
			emblaDisplayApi.scrollTo(index);
		},
		[emblaDisplayApi, emblaThumbnailStripApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaDisplayApi || !emblaThumbnailStripApi) return;
		setSelectedIndex(emblaDisplayApi.selectedScrollSnap());
		emblaThumbnailStripApi.scrollTo(emblaDisplayApi.selectedScrollSnap());
	}, [emblaDisplayApi, emblaThumbnailStripApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaDisplayApi) return;
		onSelect();

		emblaDisplayApi.on('select', onSelect).on('reInit', onSelect);
	}, [emblaDisplayApi, onSelect]);

	return <></>;
};
