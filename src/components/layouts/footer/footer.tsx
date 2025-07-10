'use client';
import { FooterProps } from './footer.types';
import { CONTAINER_STYLES } from '@/defaults';
import { Divider, Subtitle } from '@/components';
import { generateStyleObject, ThreadTheme } from '@/functions';
import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';

export const Footer = ({ logo, caption, facebookLink, instagramLink, twitterLink, githubLink, linkedInLink }: FooterProps) => {
	const styles = generateStyleObject({
		footer: {
			...CONTAINER_STYLES,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		footerContents: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		logoBlock: {
			display: 'flex',
			flexDirection: 'row',
			gap: '4px',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
		},
		circleStyle: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'black',
			borderRadius: '50%',
			width: '48px',
			height: '48px',
		},
		links: {
			color: ThreadTheme.text.standard,
		},
	});
	return (
		<footer className={styles.footer}>
			<Divider />
			<div className={styles.footerContents}>
				{logo && logo}
				{caption && <Subtitle>{caption}</Subtitle>}
				<div className={styles.logoBlock}>
					{facebookLink && (
						<a className={styles.links} href={facebookLink}>
							<FacebookLogo size={32} weight="fill" />
						</a>
					)}
					{instagramLink && (
						<a className={styles.links} href={instagramLink}>
							<InstagramLogo size={32} weight="fill" />
						</a>
					)}
					{twitterLink && (
						<a className={styles.links} href={twitterLink}>
							<TwitterLogo size={32} weight="fill" />
						</a>
					)}
					{githubLink && (
						<a className={styles.links} href={githubLink}>
							<GithubLogo size={32} weight="fill" />
						</a>
					)}
					{linkedInLink && (
						<a className={styles.links} href={linkedInLink}>
							<LinkedinLogo size={32} weight="fill" />
						</a>
					)}
				</div>
			</div>
		</footer>
	);
};
