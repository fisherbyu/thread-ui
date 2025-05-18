import { FooterProps } from './footer.types';
import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';
import { CSSProperties } from 'react';
import { CONTAINER_STYLES } from '../../../defaults';
import { Divider } from '../../ui';

export const Footer = ({ logo, caption, facebookLink, instagramLink, twitterLink, githubLink, linkedInLink }: FooterProps) => {
	const styles: Record<string, CSSProperties> = {
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
	};
	return (
		<footer style={styles.footer}>
			<Divider />
			<div style={styles.footerContents}>
				{logo && logo}
				{caption}
				<div style={styles.logoBlock}>
					{facebookLink && (
						<a href={facebookLink}>
							<FacebookLogo size={32} weight="fill" />
						</a>
					)}
					{instagramLink && (
						<a href={instagramLink}>
							<InstagramLogo size={32} weight="fill" />
						</a>
					)}
					{twitterLink && (
						<a href={twitterLink}>
							<TwitterLogo size={32} weight="fill" />
						</a>
					)}
					{githubLink && (
						<a href={githubLink}>
							<GithubLogo size={32} weight="fill" />
						</a>
					)}
					{linkedInLink && (
						<a href={linkedInLink}>
							<LinkedinLogo size={32} weight="fill" />
						</a>
					)}
				</div>
			</div>
		</footer>
	);
};
