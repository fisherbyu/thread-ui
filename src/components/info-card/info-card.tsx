import { InfoCardProps } from './info-card.types';

export const InfoCard = ({ title, url, icon, img }: InfoCardProps) => {
	return (
		<div className="mx-auto rounded-lg border bg-card text-card-foreground shadow-sm my-3 overflow-hidden max-h-60 w-[391px] h-[241px]">
			<a href={url}>
				<span className=" cursor-pointer">
					<div className="overflow-hidden w-full h-5/6">
						<img className="h-auto min-h-full w-auto min-w-full" src={img} alt="recipe cover" />
					</div>
					<div className="p-2 h-1/6">
						<span className="flex justify-start items-center">
							{icon.type === 'emoji' ? (
								<span className=" pr-1" role="img">
									{JSON.parse(`"${icon.content}"`)}
								</span>
							) : (
								<img className="pr-1" height={23} width={23} src={icon.content} alt="Recipe Logo" />
							)}
							<p className=" text-sm">{title}</p>
						</span>
					</div>
				</span>
			</a>
		</div>
	);
};
