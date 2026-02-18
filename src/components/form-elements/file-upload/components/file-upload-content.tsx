import { css } from '@/styled-system/css';
import { FormLabel } from '../../form-label';
import { useFileUploadContext } from '../file-upload-context';
import { Divider } from '@/components/ui';

export const FileUploadContent = () => {
	const { name, title } = useFileUploadContext();

	const styles = {
		container: css({
			width: '100%',
			padding: '1',
		}),
	};

	return (
		<div className={styles.container}>
			<FormLabel name={name} title={title} />
			<Divider width="100%" marginY="2px" />
		</div>
	);
};
