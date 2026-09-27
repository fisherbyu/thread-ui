'use client';

import { css } from '@/styled-system/css';
import { useCarouselContext } from '../carousel-context';
import { CarouselControls } from './carousel-controls';
import { ContentHeader } from '@/internal';

const styles = {
	titleBlock: css({
		marginBottom: '4',
	}),
};

export const CarouselHeader = () => {
	const {
		value: { controlsPosition, title, subtitle, description },
	} = useCarouselContext();

	const headerControls = controlsPosition === 'above' ? <CarouselControls /> : undefined;

	return (
		<ContentHeader
			className={styles.titleBlock}
			title={title}
			subtitle={subtitle}
			description={description}
			secondaryContent={headerControls}
		/>
	);
};
