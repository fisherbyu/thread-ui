import { css, cva, cx } from '@/styled-system/css';
import { ModalProps } from '../modal.types';
import { IconButton } from '../../icon-button';
import { title } from 'process';
import { H2, H3 } from '@/components/typography';

type ModalContentProps = Pick<ModalProps, 'children' | 'size' | 'title' | 'footer' | 'onClose'>;

export const ModalContent = ({ children, size, title, footer, onClose }: ModalContentProps) => {
	const styles = {
		outline: cva({
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
		internalContent: cva({
			base: {
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				padding: '2',
			},
			variants: {
				size: {
					sm: {
						padding: '2',
					},
					md: {
						padding: '4',
					},
					lg: {
						padding: '6',
					},
					full: {
						padding: '8',
					},
				},
			},
		}),
		modalContent: css({
			flex: 1,
			overflowY: 'auto',
		}),
		outerItems: css({
			flexShrink: 0,
			minHeight: '4',
			width: '100%',
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'row-reverse',
			justifyContent: 'space-between',
		}),
	};

	const TitleContent = title ? (
		size === 'sm' ? (
			<H3 inline>{title}</H3>
		) : (
			<H2 inline>{title}</H2>
		)
	) : null;

	return (
		<div className={styles.outline({ size })}>
			<div className={styles.internalContent({ size })}>
				<div className={styles.outerItems}>
					<IconButton onClick={onClose} color="primary" size={'sm'} name="X" />
					{TitleContent}
				</div>
				{children}
				{footer && <div className={styles.outerItems}></div>}
			</div>
		</div>
	);
};
