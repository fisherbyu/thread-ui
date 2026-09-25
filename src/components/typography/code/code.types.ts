import { BodyFontSizeOptions, Prettify } from '@/types';
import { TypographyProps } from '../typography.types';

/** Code Component Props */
export type CodeProps = Prettify<
	Pick<TypographyProps, 'children' | 'truncate'> & {
		/** Font size — body scale only @default `'sm'` */
		size?: BodyFontSizeOptions;
		/** Remove default background and coloring @default `false` */
		plain?: boolean;
	}
>;
