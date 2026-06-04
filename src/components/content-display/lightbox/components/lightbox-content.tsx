'use client';
import { css } from '@/styled-system/css';
import { Gallery } from '../../gallery';
import { useLightboxContext } from '../lightbox-context';
import { LightboxTitle } from './lightbox-title';

const styles = {
	container: css({
		width: '90vw',
		height: '85vh',
		maxHeight: { base: '80vh', md: '100%' },
		overflow: 'hidden',
	}),
};

export const LightBoxContent = () => {
	const { items, itemWrapper, appearance, startIndex } = useLightboxContext();

	return (
		<div className={styles.container}>
			<Gallery
				startIndex={startIndex}
				title={<LightboxTitle />}
				items={items}
				itemWrapper={itemWrapper}
				size="lg"
				appearance={appearance}
			/>
		</div>
	);
};
