import { cva } from '@/styled-system/css';
import { CardProps } from './card.types';
import { H3 } from '@/components/typography';
import { Divider } from '../divider';

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
		content: cva({
			variants: {
				size: {
					sm: {
						marginTop: '1',
					},
					md: {
						marginTop: '3',
					},
					lg: {
						marginTop: '3',
					},
				},
			},
			defaultVariants: {
				size: 'md',
			},
		}),
	};

	return (
		<div className={styles.cardContainer({ size, surfaceColor, shadow })}>
			{title && (
				<H3 align={title.align} inline>
					{title.text}
				</H3>
			)}
			{title?.divider && <Divider />}
			<div className={styles.content({ size })}>{children}</div>
		</div>
	);
};
