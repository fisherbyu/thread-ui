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
		underline: {
			true: { textDecorationLine: 'underline' },
			false: {},
		},
		display: {
			block: { display: 'block' },
			'inline-block': {
				display: 'inline-block',
				maxWidth: '100%',
				verticalAlign: 'bottom',
			},
		},
	},
});

export const getPresentationStyles = (props: ExpandedTypographyPresentationProps) => {
	return getPresentationStylesCva(props);
};
