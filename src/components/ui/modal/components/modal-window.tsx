import { cva } from '@/styled-system/css';
import { ModalProps } from '../modal.types';

type ModalWindowProps = Pick<ModalProps, 'children' | 'size'>;

export const ModalWindow = ({ children, size }: ModalWindowProps) => {
	const styles = {
		container: cva({
			base: {
				background: 'background',
				width: '100%',
			},
			variants: {
				size: {
					sm: {
						borderRadius: 'sm',
						maxWidth: {
							base: '100%',
							md: '480px',
						},
					},
					md: {
						borderRadius: 'md',
						maxWidth: {
							base: '100%',
							md: '560px',
						},
					},
					lg: {
						borderRadius: 'lg',
						maxWidth: {
							base: '100%',
							md: '720px',
						},
					},
					full: {
						borderRadius: 'none',
						maxWidth: '100%',
						width: '100%',
						height: '100%',
					},
				},
			},
			defaultVariants: {
				size: 'md',
			},
		}),
	};

	return <div className={styles.container({ size })}>{children}</div>;
};
