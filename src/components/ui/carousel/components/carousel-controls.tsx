import { css } from '@/styled-system/css';
import { IconButton } from '../../icon-button';

const styles = {
	container: css({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '1',
	}),
};

export const CarouselControls = () => {
	const leftButton = <IconButton color="neutral" name="CaretLeft" size="sm" />;
	const rightButton = <IconButton color="neutral" name="CaretRight" size="sm" />;

	return (
		<div className={styles.container}>
			{leftButton}
			{rightButton}
		</div>
	);
};
