import { ReactNode } from 'react';

export type FooterProps = {
	/** Logo or branding element rendered at the top of the footer */
	logo?: ReactNode;
	/** Tagline or description rendered below the logo */
	caption?: string | ReactNode;
	/** URL for the Facebook social link */
	facebookLink?: string;
	/** URL for the Instagram social link */
	instagramLink?: string;
	/** URL for the Twitter social link */
	twitterLink?: string;
	/** URL for the GitHub social link */
	githubLink?: string;
	/** URL for the LinkedIn social link */
	linkedInLink?: string;
};
