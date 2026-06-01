'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GalleryProps, GalleryState } from './gallery.types';
import useEmblaCarousel from 'embla-carousel-react';
import { GalleryEmblaProvider, GalleryProvider } from './gallery-context';
import { GalleryContent } from './components/gallery-content';

export const Gallery = ({ title, items: itemList, itemWrapper }: GalleryProps) => {
	const [emblaDisplayRef, emblaDisplayApi] = useEmblaCarousel();
	const [emblaItemTrackRef, emblaItemTrackApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
	});

	const [selectedIndex, setSelectedIndex] = useState(0);

	const onTrackItemClick = useCallback(
		(index: number) => {
			if (!emblaDisplayApi || !emblaItemTrackApi) return;
			emblaDisplayApi.scrollTo(index);
		},
		[emblaDisplayApi, emblaItemTrackApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaDisplayApi || !emblaItemTrackApi) return;
		setSelectedIndex(emblaDisplayApi.selectedScrollSnap());
		emblaItemTrackApi.scrollTo(emblaDisplayApi.selectedScrollSnap());
	}, [emblaDisplayApi, emblaItemTrackApi, setSelectedIndex]);

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

	const emblaValue = useMemo(
		() => ({
			emblaDisplayRef,
			emblaDisplayApi,
			emblaItemTrackRef,
			emblaItemTrackApi,
			onTrackItemClick,
			selectedIndex,
		}),
		[
			emblaDisplayRef,
			emblaDisplayApi,
			emblaItemTrackRef,
			emblaItemTrackApi,
			onTrackItemClick,
			selectedIndex,
		]
	);

	return (
		<GalleryProvider initialValue={initialState}>
			<GalleryEmblaProvider value={emblaValue}>
				<GalleryContent />
			</GalleryEmblaProvider>
		</GalleryProvider>
	);
};
