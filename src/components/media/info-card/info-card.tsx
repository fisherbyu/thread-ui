'use client';
import { InfoCardProps } from './info-card.types';

export const InfoCard = ({ title, url, icon, img }: InfoCardProps) => {
	return (
		<div className="thread-mx-auto thread-rounded-lg thread-border thread-bg-card thread-text-card-foreground thread-shadow-sm thread-my-3 thread-overflow-hidden thread-max-h-60 thread-w-[391px] thread-h-[241px]">
			<a href={url}>
				<span className=" thread-cursor-pointer">
					<div className="thread-overflow-hidden thread-w-full thread-h-5/6">
						<img
							className="thread-h-auto thread-min-h-full thread-w-auto thread-min-w-full"
							src={img}
							alt="recipe cover"
						/>
					</div>
					<div className="thread-p-2 thread-h-1/6">
						<span className="thread-flex thread-justify-start thread-items-center">
							{icon.type === 'emoji' ? (
								<span className=" thread-pr-1" role="img">
									{JSON.parse(`"${icon.content}"`)}
								</span>
							) : (
								<img className="thread-pr-1" height={23} width={23} src={icon.content} alt="Recipe Logo" />
							)}
							<p className="thread-truncate thread-text-sm">{title}</p>
						</span>
					</div>
				</span>
			</a>
		</div>
	);
};
