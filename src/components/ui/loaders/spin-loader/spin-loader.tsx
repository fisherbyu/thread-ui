import { UtilitySizeOptions } from '@/types';
import { css, cva, cx } from '../../../../styled-system/css';

import { SpinLoaderProps } from './spin-loader.types';

const sizeMap: Record<UtilitySizeOptions, string> = {
	sm: css({ w: '4', h: '4', borderWidth: '2px' }),
	md: css({ w: '8', h: '8', borderWidth: '3px' }),
	lg: css({ w: '12', h: '12', borderWidth: '4px' }),
};

const spinnerStyles = css({
	borderRadius: 'full',
	borderStyle: 'solid',
	borderColor: 'gray.200',
	borderTopColor: 'blue.500',
	animation: 'spin 0.75s linear infinite',
	display: 'inline-block',
});

export const SpinLoader = ({ size = 'md', className, label = 'Loading...' }: SpinLoaderProps) => {
	const styles = cva({
		base: {
			borderRadius: 'full',
			borderStyle: 'solid',
			borderColor: 'gray.200',
			borderTopColor: 'blue.500',
			animation: 'spin 0.75s linear infinite',
			display: 'inline-block',
		},
	});
	return (
		<div
			role="status"
			aria-label={label}
			className={cx(spinnerStyles, sizeMap[size], className)}
		/>
	);
};
