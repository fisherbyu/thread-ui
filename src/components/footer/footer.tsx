import { FacebookLogo, GithubLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';
import { LinkWrapper } from '../../internal-components';
import { Divider } from '../divider';
import { FooterProps } from './footer.types';

export const Footer = ({ logo, caption, facebookLink, instagramLink, twitterLink, githubLink, linkedInLink }: FooterProps) => {
	return (
		<footer className="thread-h-52 thread-w-full">
			<div className="thread-container thread-mx-auto">
				<Divider width="100%" />
				<div className="">
					<p className="thread-mt-4 thread-text-center">
						{logo && (
							<LinkWrapper link={logo.link} className="thread-inline-block">
								{logo.icon}
							</LinkWrapper>
						)}
						{caption && <span className="thread-mx-auto thread-mt-1 thread-text-sm thread-text-gray-500">{caption}</span>}
					</p>
					<div className="thread-flex thread-justify-center thread-my-2 thread-space-x-6">
						<span className="thread-inline-flex thread-justify-center thread-w-full thread-gap-3 thread-m-auto md:thread-justify-start md:thread-w-auto">
							{facebookLink && (
								<LinkWrapper
									link={githubLink}
									className="thread-w-6 thread-h-6 thread-transition thread-fill-black hover:thread-text-blue-500"
								>
									<span className="thread-sr-only">facebook</span>
									<FacebookLogo />
								</LinkWrapper>
							)}
							{instagramLink && (
								<LinkWrapper
									link={githubLink}
									className="thread-w-6 thread-h-6 thread-transition thread-fill-black hover:thread-text-blue-500"
								>
									<span className="thread-sr-only">instagram</span>
									<InstagramLogo />
								</LinkWrapper>
							)}
							{twitterLink && (
								<LinkWrapper
									link={githubLink}
									className="thread-w-6 thread-h-6 thread-transition thread-fill-black hover:thread-text-blue-500"
								>
									<span className="thread-sr-only">instagram</span>
									<TwitterLogo />
								</LinkWrapper>
							)}
							{githubLink && (
								<LinkWrapper
									link={githubLink}
									className="thread-w-6 thread-h-6 thread-transition thread-fill-black hover:thread-text-blue-500"
								>
									<span className="thread-sr-only">instagram</span>
									<GithubLogo />
								</LinkWrapper>
							)}
							{linkedInLink && (
								<LinkWrapper
									link={linkedInLink}
									className="thread-w-6 thread-h-6 thread-transition thread-fill-black hover:thread-text-blue-500"
								>
									<span className="thread-sr-only">instagram</span>
								</LinkWrapper>
							)}
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};
