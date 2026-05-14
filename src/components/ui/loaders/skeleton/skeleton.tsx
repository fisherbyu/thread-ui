import { cva } from '@/styled-system/css';
import type { SkeletonLoaderProps } from './skeleton.types';

const styles = cva({
	base: {
		display: 'block',
		backgroundImage: `linear-gradient(90deg, var(--thread-structure-subtle) 25%, var(--thread-hover) 50%, var(--thread-structure-subtle) 75%)`,
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

/**
 * Low-level skeleton primitive for building content placeholders.
 * Compose multiple instances to mirror the shape of loading content.
 *
 * @example
 * <SkeletonLoader w="100%" h="4" />
 * <SkeletonLoader w="10" h="10" round />
 */
export const SkeletonLoader = ({ w = '100%', h = '3rem', round = false }: SkeletonLoaderProps) => {
	return <span role="status" className={styles({ round })} style={{ width: w, height: h }} />;
};
