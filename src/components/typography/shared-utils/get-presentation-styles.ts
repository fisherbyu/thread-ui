import { cva } from '@/styled-system/css';
import { ExpandedTypographyPresentationProps } from '../typography.types';

/** Presentation CVA for align/truncate. Not part of the typography chord. */
const getPresentationStylesCva = cva({
	variants: {
		align: {
			left: { textAlign: 'left' },
			center: { textAlign: 'center' },
		},
		truncate: {
			true: {
				overflow: 'hidden',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			},
		},
		indent: {
			true: {
				textIndent: '4',
			},
			false: {},
		},
	},
});

export const getPresentationStyles = (props: ExpandedTypographyPresentationProps) => {
	return getPresentationStylesCva(props);
};
