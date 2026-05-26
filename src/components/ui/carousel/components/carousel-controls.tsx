import { css } from '@/styled-system/css';
import { IconButton } from '../../icon-button';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '2',
	}),
};

export const CarouselControls = () => {
	const leftButton = <IconButton name="CaretLeft" size="sm" />;
	const rightButton = <IconButton name="CaretRight" size="sm" />;

	return (
		<div className={styles.container}>
			{leftButton}
			{rightButton}
		</div>
	);
};
