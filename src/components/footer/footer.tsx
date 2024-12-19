// import Image from 'next/image';
// import GitHubIcon from '@/public/core/github.svg';
// import LinkedInIcon from '@/public/core/linkedin.svg';
// import AFLogo from '@/public/core/af-logo.svg';
// import Link from 'next/link';
import { LinkWrapper } from '../../internal-components/link-wrapper/link-wrapper';
import { Divider } from '../divider';
import { FooterProps } from './footer.types';

export default function CoreFooter({
	icon,
	caption,
	facebookLink,
	instagramLink,
	twitterLink,
	githubLink,
	linkedInLink,
}: FooterProps) {
	return (
		<footer className="thread-h-52 thread-w-full">
			<div className="thread-container mx-auto">
				<Divider width="100%" />
				<div className="">
					<p className="mt-4 text-center">
						{icon && (
							<LinkWrapper link={icon.link} className="inline-block">
								<icon.Icon />
							</LinkWrapper>
						)}
						{caption && <span className="mx-auto mt-1 text-sm text-gray-500">{caption}</span>}
					</p>
					<div className="flex justify-center my-2 space-x-6">
						<span className="inline-flex justify-center w-full gap-3 m-auto md:justify-start md:w-auto">
							{githubLink && (
								<LinkWrapper link={githubLink} className="w-6 h-6 transition fill-black hover:text-blue-500">
									<span className="sr-only">github</span>
									{/* <Image src={GitHubIcon} alt="git-hub logo" /> */}
								</LinkWrapper>
							)}
							{linkedInLink && (
								<LinkWrapper link={linkedInLink} className="w-6 h-6 transition fill-black hover:text-blue-500">
									<span className="sr-only">Linkedin</span>
									{/* <Image src={LinkedInIcon} alt="LinkedIn Logo" /> */}
								</LinkWrapper>
							)}
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

// export default function CoreFooter({
// 	icon,
// 	caption,
// 	facebookLink,
// 	instagramLink,
// 	twitterLink,
// 	githubLink,
// 	linkedInLink,
// }: FooterProps) {
// 	return (
// 		<footer className="thread-h-52 thread-w-full">
// 			<div className="thread-container mx-auto">
// 				<Divider width="100%" />
// 				<div className="">
// 					<p className="mt-4 text-center">
// 						{icon &&

//                         <LinkWrapper link={icon.link}>
//                             <icon />
//                         </LinkWrapper>
//                         }
// 						{/* <Link href="/">
// 							<Image src={AFLogo} alt="AF" className="mx-auto" />
// 						</Link> */}
// 						<span className="mx-auto mt-1 text-sm text-gray-500">
// 							{/* <Link href="/login">Created by Andrew Fisher</Link> */}
// 						</span>
// 					</p>
// 					<div className="flex justify-center my-2 space-x-6">
// 						<span className="inline-flex justify-center w-full gap-3 m-auto md:justify-start md:w-auto">
// 							<a href="https://github.com/fisherbyu" className="w-6 h-6 transition fill-black hover:text-blue-500">
// 								<span className="sr-only">github</span>
// 								{/* <Image src={GitHubIcon} alt="git-hub logo" /> */}
// 							</a>
// 							<a
// 								href="https://www.linkedin.com/in/fisherandrew777/"
// 								className="w-6 h-6 transition fill-black hover:text-blue-500"
// 							>
// 								<span className="sr-only">Linkedin</span>
// 								{/* <Image src={LinkedInIcon} alt="LinkedIn Logo" /> */}
// 							</a>
// 						</span>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// }
