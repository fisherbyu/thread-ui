'use client';
import { css } from '@/styled-system/css';
import { Gallery } from '../../gallery';
import { useLightboxContext } from '../lightbox-context';
import { LightboxTitle } from './lightbox-title';

const styles = {
	container: css({
		width: '100vw',
		height: '100vh',
		padding: '4',
	}),
};

export const LightBoxContent = () => {
	const { items, itemWrapper } = useLightboxContext();

	return (
		<div className={styles.container}>
			<Gallery
				title={<LightboxTitle />}
				items={items}
				itemWrapper={itemWrapper}
				size="lg"
				appearance="bare"
			/>
		</div>
	);
};
