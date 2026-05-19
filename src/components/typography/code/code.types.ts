import { BodyFontSizeOptions, Prettify } from '@/types';
import { TypographyProps } from '../typography';

/** Code Component Props */
export type CodeProps = Prettify<
	TypographyProps & {
		/** Font size — body scale only @default `'sm'` */
		size?: BodyFontSizeOptions;
	}
>;
