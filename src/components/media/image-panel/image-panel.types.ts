import { ImageProps, ColoredTextOptions } from '@/types';

export type ImagePanelProps = {
	/** Main heading */
	title: string;
	/** Optional subtitle rendered below the title */
	subtitle?: string;
	/** Body text paragraphs rendered below the subtitle */
	contents?: string[];
	/** Primary image, shown on all screen sizes unless `smImage` is provided */
	image: ImageProps;
	/** Alternate image shown on small screens. If provided, `image` is hidden below `md` */
	smImage?: ImageProps;
	/** Places the text block below the image instead of above on mobile @default `false` */
	contentBelow?: boolean;
	/** Places the text block to the right of the image on large screens @default `false` */
	contentLeft?: boolean;
	/** Color variant for the title @default `'standard'` */
	titleColor?: ColoredTextOptions;
};
