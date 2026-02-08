import { css, cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H1, H3 } from '@/components/typography';

export const Card = ({ surfaceColor = 'background', children, size, title }: CardProps) => {
	const styles = {
		cardContainer: cva({
			base: {
				borderWidth: 'sm',
				borderColor: 'structure',
				padding: {
					base: '3',
				},
				display: 'flex',
				flexDirection: 'column',
				gap: '1',
				marginX: 'auto',
				maxWidth: '850px',
				width: {
					base: '100%',
					md: '75%',
				},
			},
			variants: {
				size: {
					sm: {
						borderRadius: 'sm',
						gap: '1',
						maxWidth: '600px',
					},
					md: {
						borderRadius: 'md',
						gap: '1.5',
					},
					lg: {
						borderRadius: 'lg',
						gap: '2',
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
				surfaceColor: 'background',
			},
		}),
	};

	return (
		<div className={styles.cardContainer({ size: size, surfaceColor: surfaceColor })}>
			{title && <H3 inline>{title}</H3>}
			{children}
		</div>
	);
};
