import { cva } from '@/styled-system/css';

export const gridLayoutStyles = cva({
	base: {
		display: 'grid',
	},
	variants: {
		cols: {
			1: { gridTemplateColumns: 'repeat(1,  minmax(0, 1fr))' },
			2: { gridTemplateColumns: 'repeat(2,  minmax(0, 1fr))' },
			3: { gridTemplateColumns: 'repeat(3,  minmax(0, 1fr))' },
			4: { gridTemplateColumns: 'repeat(4,  minmax(0, 1fr))' },
			5: { gridTemplateColumns: 'repeat(5,  minmax(0, 1fr))' },
			6: { gridTemplateColumns: 'repeat(6,  minmax(0, 1fr))' },
			7: { gridTemplateColumns: 'repeat(7,  minmax(0, 1fr))' },
			8: { gridTemplateColumns: 'repeat(8,  minmax(0, 1fr))' },
			9: { gridTemplateColumns: 'repeat(9,  minmax(0, 1fr))' },
			10: { gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' },
			11: { gridTemplateColumns: 'repeat(11, minmax(0, 1fr))' },
			12: { gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' },
		},
		mdCols: {
			1: { gridTemplateColumns: { md: 'repeat(1,  minmax(0, 1fr))' } },
			2: { gridTemplateColumns: { md: 'repeat(2,  minmax(0, 1fr))' } },
			3: { gridTemplateColumns: { md: 'repeat(3,  minmax(0, 1fr))' } },
			4: { gridTemplateColumns: { md: 'repeat(4,  minmax(0, 1fr))' } },
			5: { gridTemplateColumns: { md: 'repeat(5,  minmax(0, 1fr))' } },
			6: { gridTemplateColumns: { md: 'repeat(6,  minmax(0, 1fr))' } },
			7: { gridTemplateColumns: { md: 'repeat(7,  minmax(0, 1fr))' } },
			8: { gridTemplateColumns: { md: 'repeat(8,  minmax(0, 1fr))' } },
			9: { gridTemplateColumns: { md: 'repeat(9,  minmax(0, 1fr))' } },
			10: { gridTemplateColumns: { md: 'repeat(10, minmax(0, 1fr))' } },
			11: { gridTemplateColumns: { md: 'repeat(11, minmax(0, 1fr))' } },
			12: { gridTemplateColumns: { md: 'repeat(12, minmax(0, 1fr))' } },
		},
		lgCols: {
			1: { gridTemplateColumns: { lg: 'repeat(1,  minmax(0, 1fr))' } },
			2: { gridTemplateColumns: { lg: 'repeat(2,  minmax(0, 1fr))' } },
			3: { gridTemplateColumns: { lg: 'repeat(3,  minmax(0, 1fr))' } },
			4: { gridTemplateColumns: { lg: 'repeat(4,  minmax(0, 1fr))' } },
			5: { gridTemplateColumns: { lg: 'repeat(5,  minmax(0, 1fr))' } },
			6: { gridTemplateColumns: { lg: 'repeat(6,  minmax(0, 1fr))' } },
			7: { gridTemplateColumns: { lg: 'repeat(7,  minmax(0, 1fr))' } },
			8: { gridTemplateColumns: { lg: 'repeat(8,  minmax(0, 1fr))' } },
			9: { gridTemplateColumns: { lg: 'repeat(9,  minmax(0, 1fr))' } },
			10: { gridTemplateColumns: { lg: 'repeat(10, minmax(0, 1fr))' } },
			11: { gridTemplateColumns: { lg: 'repeat(11, minmax(0, 1fr))' } },
			12: { gridTemplateColumns: { lg: 'repeat(12, minmax(0, 1fr))' } },
		},
		align: {
			start: { alignItems: 'start' },
			center: { alignItems: 'center' },
			end: { alignItems: 'end' },
			stretch: { alignItems: 'stretch' },
		},
		justify: {
			start: { justifyItems: 'start' },
			center: { justifyItems: 'center' },
			end: { justifyItems: 'end' },
			stretch: { justifyItems: 'stretch' },
		},
		gap: {
			sm: { gap: { base: '4px', lg: '8px' } },
			md: { gap: { base: '16px', lg: '24px' } },
			lg: { gap: { base: '24px', lg: '40px' } },
		},
		// gap: {
		// 	sm: {
		// 		gap: {
		// 			base: 0,
		// 			lg: 0,
		// 		},
		// 	},
		// 	md: {
		// 		gap: {
		// 			base: 12,
		// 			lg: 6,
		// 		},
		// 	},
		// 	lg: {
		// 		gap: {
		// 			base: 0,
		// 			lg: 0,
		// 		},
		// 	},
		// },
	},
});
