import { CONTAINER_STYLES } from '../../../defaults';
import { makeStyleObject } from '../../../functions';
import { getThemeValue } from '../../../functions/theme/get-theme';

export const TestComponent = () => {
	const styles = makeStyleObject({
		container: CONTAINER_STYLES,
		block: {
			backgroundColor: getThemeValue().background,
		},
		text: {
			color: getThemeValue().primary.main,
		},
	});
	return (
		<div className={`${styles.container} ${styles.block}`}>
			<p className={styles.text}>TEST 123</p>
		</div>
	);
};
