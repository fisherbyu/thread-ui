import { ReactNode } from 'react';

export type FooterProps = {
	icon?: {
		Icon: React.ComponentType; // Changed from svg: ReactSVGElement to Icon component
		link: string | ReactNode;
	};
	caption?: string | ReactNode;
	facebookLink?: string;
	instagramLink?: string;
	twitterLink?: string;
	githubLink?: string;
	linkedInLink?: string;
};
