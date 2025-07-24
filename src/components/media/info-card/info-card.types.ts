import { IconNames } from '@/components/ui';

export type InfoCardProps = {
	title: string;
	url: string;
	icon: IconNames | { type: 'emoji' | 'svg'; content: string };
	img: string;
};
