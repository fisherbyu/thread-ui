import { IconNames } from '../ui';

/**
 * Base navigation item type used to compose navigation component props.
 */
export type NavigationItem = {
	/** The URL or path the navigation item links to. */
	href: string;
	/** Optional icon displayed alongside the navigation item. */
	icon?: IconNames;
	/** The display text for the navigation item. */
	title: string;
};
