'use client';
import { FooterProps } from './footer.types';
import { Divider, Subtitle } from '@/components';
import { FacebookLogoIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, TwitterLogoIcon } from '@phosphor-icons/react';
import { css, cx } from '@/styled-system/css';
import { container } from '@/styled-system/patterns';

export const Footer = ({ logo, caption, facebookLink, instagramLink, twitterLink, githubLink, linkedInLink }: FooterProps) => {
	const weight = 'bold';
	const size = 24;

	const styles = {
		footer: cx(container(), css({ marginX: 'auto' })),
		footerContents: css({
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			paddingY: '40px',
			marginX: 'auto',
			overflow: 'hidden',
			maxWidth: '1280px',
		}),
		textBlock: css({
			marginTop: '8px',
		}),
		logoBlock: css({
			display: 'flex',
			flexDirection: 'row',
			gap: '12px',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			paddingY: '16px',
		}),
		circleStyle: css({
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: '36px',
			backgroundColor: 'black',
			borderRadius: '50%',
			width: '48px',
			height: '48px',
		}),
		links: css({
			color: 'text.standard',
		}),
	};

	return (
		<footer className={styles.footer}>
			<Divider />
			<div className={styles.footerContents}>
				{logo && logo}
				{caption && <Subtitle>{caption}</Subtitle>}
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
		</footer>
	);
};
