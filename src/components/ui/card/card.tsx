import { cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H3 } from '@/components/typography';

export const Card = ({
	surfaceColor = 'background',
	children,
	size,
	shadow = true,
	title,
}: CardProps) => {
	const styles = {
		cardContainer: cva({
			base: {
				borderWidth: 'sm',
				borderColor: 'structure',
				padding: {
					base: '6',
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
				shadow: {
					true: {
						boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
					},
					false: {
						boxShadow: 'none',
					},
				},
			},
			defaultVariants: {
				size: 'md',
				surfaceColor: 'background',
				shadow: true,
			},
		}),
	};

	return (
		<div className={styles.cardContainer({ size, surfaceColor, shadow })}>
			{title && <H3 inline>{title}</H3>}
			{children}
		</div>
	);
};
