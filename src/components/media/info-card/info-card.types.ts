export type InfoCardProps = {
	title: string;
	url: string;
	icon: {
		type: 'emoji' | 'svg';
		content: string;
	};
	img: string;
};
