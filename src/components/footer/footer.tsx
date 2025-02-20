'use client';
import { FacebookLogo, GithubLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';
import { LinkWrapper } from '../../internal-components';
import { Divider } from '../divider';
import { FooterProps } from './footer.types';
import { CSSProperties } from 'react';
import { useTheme } from '../../utils';
import { log } from 'console';

export const Footer = ({ logo, caption, facebookLink, instagramLink, twitterLink, githubLink, linkedInLink }: FooterProps) => {
	const { theme } = useTheme();

	const styles: Record<string, CSSProperties> = {
		footer: {
			// backgroundColor: '#ffffff',
			backgroundColor: theme.colors.background,
			height: '208px',
			width: '100%',
		},

		logoWrapper: {
			width: '64px',
			height: '64px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	};

	return (
		<footer style={styles.footer}>
			<div className="thread-border thread-container thread-mx-auto">
				<Divider width="100%" />
				<div className="thread-w-full thread-h-full thread-flex thread-flex-col thread-justify-center thread-items-center">
					{logo && (
						<LinkWrapper style={styles.logoWrapper} link={logo.link}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 27 32"
								width="100%"
								height="100%"
								preserveAspectRatio="xMidYMid meet"
							>
								<path d="M6.42 8.62 l1.78 -4.06 l7.66 15.44 l-3.76 0 z M3.12 16.04 c-0.26666 0.49334 -0.56668 0.9733 -0.90002 1.44 c-0.28 0.4 -0.61 0.83 -0.99 1.29 s-0.79666 0.87 -1.25 1.23 l3.34 0 l3.32 0 c-0.53334 -0.30666 -1.0133 -0.68332 -1.44 -1.13 s-0.79332 -0.88332 -1.1 -1.31 c-0.36 -0.49334 -0.68666 -1 -0.98 -1.52 z M21.494500000000002 12.2 c0.33334 0.17334 0.66668 0.38666 1 0.64 c0.28 0.22666 0.57666 0.51 0.89 0.85 s0.59 0.75 0.83 1.23 l0 -2.72 l0 -3 c-0.25334 0.53334 -0.53668 0.99 -0.85002 1.37 s-0.61 0.69 -0.89 0.93 c-0.33334 0.28 -0.66 0.51334 -0.98 0.7 z M22.7345 5 l4.26 -0.000019531 l0 5.4 c-0.32 -0.74666 -0.69334 -1.46 -1.12 -2.14 c-0.37334 -0.58666 -0.82 -1.1833 -1.34 -1.79 s-1.12 -1.0967 -1.8 -1.47 z M16.0745 5.02 l0 14.98 l3.52 0 l0 -14.98 l-3.52 0 z" />
							</svg>
						</LinkWrapper>
					)}
					{caption && <span className="thread-text-sm thread-text-gray-500">{caption}</span>}
					<div className="thread-flex thread-flex-row thread-items-center thread-justify-center"></div>
				</div>
			</div>
		</footer>
	);
};
