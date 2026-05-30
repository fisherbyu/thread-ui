'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '../../icon-button';
import { useCarouselContext } from '../carousel-context';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '1',
	}),
};

export const CarouselControls = () => {
	const {
		value: { current, mdCols, lgCols },
		setValue,
	} = useCarouselContext();

	const increment = () => {
		if (current !== lgCols) {
			setValue((prev) => ({ ...prev, current: current + 1 }));
		}
	};
	const decrement = () => {
		if (current !== mdCols) {
			setValue((prev) => ({ ...prev, current: current - 1 }));
		}
	};

	const leftButton = (
		<IconButton color="neutral" name="CaretLeft" size="sm" onClick={decrement} />
	);
	const rightButton = (
		<IconButton color="neutral" name="CaretRight" size="sm" onClick={increment} />
	);

	return (
		<div className={styles.container}>
			{leftButton}
			{rightButton}
		</div>
	);
};
