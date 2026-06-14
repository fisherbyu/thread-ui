'use client';
import { FooterProps } from './footer.types';
import { Container, Divider, Subtitle } from '@/components';
import {
	FacebookLogoIcon,
	GithubLogoIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
	TwitterLogoIcon,
} from '@phosphor-icons/react';
import { css } from '@/styled-system/css';

const styles = {
	footerContents: css({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingY: '10',
		marginX: 'auto',
		overflow: 'hidden',
		maxWidth: '1280px',
	}),
	logoBlock: css({
		display: 'flex',
		flexDirection: 'row',
		gap: '3',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingY: '4',
	}),
	links: css({
		color: 'text.standard',
	}),
};

/**
 * Site footer with optional logo, description, and social media icon links.
 * Only social icons with a provided URL are rendered.
 *
 * @example
 * <Footer
 *   logo={<Logo />}
 *   description="© 1776 USA."
 *   githubLink="https://github.com/acme"
 *   linkedInLink="https://linkedin.com/company/acme"
 * />
 */
export const Footer = ({
	logo,
	description,
	bg = 'canvas',
	facebookLink,
	instagramLink,
	twitterLink,
	githubLink,
	linkedInLink,
}: FooterProps) => {
	const weight = 'bold';
	const size = 24;

	return (
		<Container as="footer" bg={bg}>
			<Divider />
			<div className={styles.footerContents}>
				{logo && logo}
				{description && <Subtitle>{description}</Subtitle>}
				<div className={styles.logoBlock}>
					{facebookLink && (
						<a className={styles.links} href={facebookLink}>
							<FacebookLogoIcon size={size} weight={weight} />
						</a>
					)}
					{instagramLink && (
						<a className={styles.links} href={instagramLink}>
							<InstagramLogoIcon size={size} weight={weight} />
						</a>
					)}
					{twitterLink && (
						<a className={styles.links} href={twitterLink}>
							<TwitterLogoIcon size={size} weight={weight} />
						</a>
					)}
					{githubLink && (
						<a className={styles.links} href={githubLink}>
							<GithubLogoIcon size={size} weight={weight} />
						</a>
					)}
					{linkedInLink && (
						<a className={styles.links} href={linkedInLink}>
							<LinkedinLogoIcon size={size} weight={weight} />
						</a>
					)}
				</div>
			</div>
		</Container>
	);
};
