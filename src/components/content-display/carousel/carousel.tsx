'use client';
import { useMemo, useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { CarouselProvider, CarouselEmblaProvider } from './carousel-context';
import { CarouselProps, CarouselState } from './carousel.types';
import { CarouselContent } from './components/carousel-content';

export const Carousel = ({
	title,
	items: itemList,
	controlsPosition = 'above',
	mdCols,
	lgCols,
	itemWrapper,
}: CarouselProps) => {
	// Embla Config
	const [emblaRef, emblaApi] = useEmblaCarousel();

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	const onSelect = useCallback((api: EmblaCarouselType) => {
		setSelectedIndex(api.selectedScrollSnap());
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect(emblaApi); // initial state
		emblaApi.on('select', onSelect).on('reInit', onSelect);
		return () => {
			emblaApi.off('select', onSelect).off('reInit', onSelect);
		};
	}, [emblaApi, onSelect]);

	const normalizedItems = useMemo(
		() =>
			itemList.map((item, index) => ({
				...item,
				id: String(index),
			})),
		[itemList]
	);

	const initialState: CarouselState = useMemo(() => {
		const items = Object.fromEntries(
			normalizedItems.map((item) => [item.id, item])
		) as CarouselState['items'];
		const itemOrder = normalizedItems.map((item) => item.id);

		return {
			title,
			items,
			itemOrder,
			ItemWrapper: itemWrapper,
			controlsPosition,
			mdCols,
			lgCols: lgCols ? lgCols : mdCols,
		};
	}, [title, normalizedItems, controlsPosition, mdCols, lgCols]);

	const emblaValue = useMemo(
		() => ({
			emblaRef,
			emblaApi,
			selectedIndex,
			canScrollPrev,
			canScrollNext,
		}),
		[emblaRef, emblaApi, selectedIndex, canScrollPrev, canScrollNext]
	);

	if (!itemList.length) return null;

	return (
		<CarouselProvider initialValue={initialState}>
			<CarouselEmblaProvider value={emblaValue}>
				<CarouselContent />
			</CarouselEmblaProvider>
		</CarouselProvider>
	);
};
