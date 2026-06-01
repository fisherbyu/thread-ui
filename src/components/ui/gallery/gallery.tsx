'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GalleryProps, GalleryState } from './gallery.types';
import useEmblaCarousel from 'embla-carousel-react';

export const Gallery = ({ title, items: itemList, itemWrapper }: GalleryProps) => {
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

	const normalizedItems = useMemo(
		() =>
			itemList.map((item, index) => ({
				content: item,
				id: index,
			})),
		[itemList]
	);

	const initialState: GalleryState = useMemo(() => {
		const items = Object.fromEntries(
			normalizedItems.map((item) => [item.id, item])
		) as GalleryState['items'];

		const itemOrder = normalizedItems.map((item) => item.id);

		return {
			title,
			items,
			itemOrder,
			ItemWrapper: itemWrapper,
		};
	}, [title, normalizedItems]);

	return <></>;
};
