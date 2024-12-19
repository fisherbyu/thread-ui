import { ReactNode } from 'react';

export type FooterProps = {
	logo?: {
		icon: ReactNode;
		link: string | ReactNode;
	};
	caption?: string | ReactNode;
	facebookLink?: string;
	instagramLink?: string;
	twitterLink?: string;
	githubLink?: string;
	linkedInLink?: string;
};
