import { BodyFontSizeOptions, Prettify } from '@/types';
import { TypographyProps } from '../typography';

/** Code Component Props */
export type CodeProps = Prettify<
	Pick<TypographyProps, 'children' | 'inline' | 'truncate'> & {
		/** Font size — body scale only @default `'sm'` */
		size?: BodyFontSizeOptions;
	}
>;
