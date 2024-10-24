export const InfoCard = () => {
	const page = {
		id: 1,
		title: 'string',
		url: '#',
		icon: {
			type: 'emoji',
			content: '🤘',
		},
		img: 'https://images.unsplash.com/photo-1685397166786-b43234186139?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
	};
	return (
		<div className="mx-auto rounded-lg border bg-card text-card-foreground shadow-sm my-3 overflow-hidden max-h-60 w-[391px] h-[241px]">
			<a href={page.url}>
				<span className=" cursor-pointer">
					<div className="overflow-hidden w-full h-5/6">
						<img className="h-auto min-h-full w-auto min-w-full" src={page.img} alt="recipe cover" />
					</div>
					<div className="p-2 h-1/6">
						<span className="flex justify-start items-center">
							{page.icon.type === 'emoji' ? (
								<span className=" pr-1" role="img">
									{JSON.parse(`"${page.icon.content}"`)}
								</span>
							) : (
								<img className="pr-1" height={23} width={23} src={page.icon.content} alt="Recipe Logo" />
							)}
							<p className=" text-sm">{page.title}</p>
						</span>
					</div>
				</span>
			</a>
		</div>
	);
};
