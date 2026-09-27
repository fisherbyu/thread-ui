import { ReactNode } from 'react';
import { IconNames } from '@/components/ui';
import { UtilityColorOptions } from '@/types';

/** Fill of the active item. `neutral` uses the theme's `active` highlight */
export type NavListItemActiveColor = UtilityColorOptions | 'neutral';

export type NavListItemCollapse = 'never' | 'responsive' | 'always';

export type NavListItemProps = {
	/** Item label */
	children: ReactNode;
	/** Shows the active fill @default `false` */
	active?: boolean;
	/** Leading icon, filled while active */
	icon?: IconNames;
	/** Renders the item as a link */
	href?: string;
	/** Click handler */
	onClick?: () => void;
	/** Active fill color @default `'primary'` */
	activeColor?: NavListItemActiveColor;
	/** `pill` for navigation, `row` for list selections @default `'pill'` */
	shape?: 'pill' | 'row';
	/** When to collapse to an icon-only circle; `responsive` collapses below `lg` @default `'never'` */
	collapse?: NavListItemCollapse;
};
