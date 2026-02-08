import { css, cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H1 } from '@/components/typography';

export const Card = ({ surfaceColor = 'elevated', children, size, title }: CardProps) => {
	const styles = {
		cardContainer: cva({
			base: {
				borderWidth: 'sm',
				borderColor: 'structure',
				padding: {
					base: '8px',
				},
				width: {
					base: '100%',
					md: '75%',
				},
				maxWidth: '850px',
			},
			variants: {
				size: {
					sm: {
						borderRadius: 'sm',
						maxWidth: '600px',
					},
					md: {
						borderRadius: 'md',
						padding: {
							md: '16px',
						},
					},
					lg: {
						borderRadius: 'lg',
						padding: {
							md: '20px',
						},
					},
				},
				surfaceColor: {
					background: {
						backgroundColor: 'background',
					},
					surface: {
						backgroundColor: 'surface',
					},
					elevated: {
						backgroundColor: 'elevated',
					},
				},
			},
			defaultVariants: {
				size: 'md',
				surfaceColor: 'surface',
			},
		}),
	};

	return (
		<div className={styles.cardContainer({ size: size, surfaceColor: surfaceColor })}>
			{title && <H1>{title}</H1>}
			{children}
		</div>
	);
};
