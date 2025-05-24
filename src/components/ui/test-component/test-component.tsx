import { CONTAINER_STYLES } from '@/defaults';
import { useThreadStyleObjects, ThreadTheme } from '@/functions';

export const TestComponent = () => {
	const styles = useThreadStyleObjects({
		container: CONTAINER_STYLES,
		block: {
			backgroundColor: ThreadTheme.background,
		},
		text: {
			color: ThreadTheme.primary.main,
		},
	});
	return (
		<div className={`${styles.container} ${styles.block}`}>
			<p className={styles.text}>TEST 123</p>
		</div>
	);
};
