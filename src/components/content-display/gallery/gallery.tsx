'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GalleryProps, GalleryState } from './gallery.types';
import useEmblaCarousel from 'embla-carousel-react';
import { GalleryEmblaProvider, GalleryProvider } from './gallery-context';
import { GalleryContent } from './components/gallery-content';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

/**
 * A synchronized dual-carousel gallery with a main display and a thumbnail track. Powered by [Embla Carousel](https://www.embla-carousel.com)
 *
 * Selecting a thumbnail scrolls the main display, and swiping the main display
 * updates the active thumbnail. Supports trackpad scrolling on the thumbnail track
 * via the Embla wheel gestures plugin.
 *
 * @example
 * ```tsx
 * <Gallery
 *   title="Photos"
 *   items={[<img src="a.jpg" />, <img src="b.jpg" />]}
 *   appearance="bare"
 * />
 * ```
 */
export const Gallery = ({
	title,
	subtitle,
	items: itemList,
	itemWrapper,
	size = 'lg',
	appearance = 'framed',
	startIndex = 0,
	variableWidths = false,
}: GalleryProps) => {
	const [emblaDisplayRef, emblaDisplayApi] = useEmblaCarousel({ startIndex });
	const [emblaItemTrackRef, emblaItemTrackApi] = useEmblaCarousel(
		{
			startIndex,
			containScroll: 'keepSnaps',
			dragFree: true,
		},
		[WheelGesturesPlugin()]
	);

	const [selectedIndex, setSelectedIndex] = useState(startIndex);

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
			subtitle,
			items,
			itemOrder,
			ItemWrapper: itemWrapper,
			size,
			appearance,
			variableWidths,
		};
	}, [title, normalizedItems, size]);

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
