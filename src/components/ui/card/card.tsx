import { css, cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H1, H3 } from '@/components/typography';

export const Card = ({ surfaceColor = 'elevated', children, size, title }: CardProps) => {
	const styles = {
		cardContainer: cva({
			base: {
				borderWidth: 'sm',
				borderColor: 'structure',
				padding: {
					base: '3',
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
					},
					lg: {
						borderRadius: 'lg',
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
			{title && <H3 inline={size === 'sm'}>{title}</H3>}
			{children}
		</div>
	);
};
