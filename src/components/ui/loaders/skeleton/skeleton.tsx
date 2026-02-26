import { ThreadTheme } from '@/theme';
import { cva } from '../../../../styled-system/css';
import type { SkeletonProps } from './skeleton.types';

/**
 * Low-level skeleton primitive for building content placeholder layouts.
 * Compose multiple instances to mirror the shape of loading content.
 *
 * @example
 * <Skeleton w="100%" h="4" />
 * <Skeleton w="10" h="10" round />
 */
export const Skeleton = ({ w = '100%', h = '3rem', round = false }: SkeletonProps) => {
	const styles = cva({
		base: {
			display: 'block',
			backgroundImage: `linear-gradient(90deg, var(--thread-elevated) 25%, var(--thread-structure) 50%, var(--thread-elevated) 75%)`,
			backgroundSize: '200% 100%',
			animation: 'shimmer 1.5s linear infinite',
		},
		variants: {
			round: {
				true: { borderRadius: 'full' },
				false: { borderRadius: 'sm' },
			},
		},
		defaultVariants: {
			round: false,
		},
	});

	return <span role="status" className={styles({ round })} style={{ width: w, height: h }} />;
};
