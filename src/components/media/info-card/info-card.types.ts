import { IconNames } from '@/components/ui';

export type InfoCardProps = {
	/** Card title displayed in the caption bar */
	title: string;
	/** URL the card links to */
	url: string;
	/**
	 * Icon displayed alongside the title. Accepts a named icon, an emoji, or an SVG.
	 * @example
	 * icon="Star"
	 * icon={{ type: 'emoji', content: '1F4C4' }}
	 * icon={{ type: 'svg', content: '/icons/article.svg' }}
	 */
	icon: IconNames | { type: 'emoji' | 'svg'; content: string };
	/** Cover image URL displayed in the card */
	img: string;
};
