import { InfoCardProps } from './info-card.types';

export const InfoCard = ({ title, url, icon, img }: InfoCardProps) => {
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
		<div
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				borderRadius: '0.5rem',
				border: '1px solid',
				backgroundColor: 'var(--card-background)',
				color: 'var(--card-foreground)',
				boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				marginTop: '0.75rem',
				marginBottom: '0.75rem',
				overflow: 'hidden',
				maxHeight: '15rem',
				width: '391px',
				height: '241px',
			}}
		>
			<a href={page.url}>
				<span style={{ cursor: 'pointer' }}>
					<div
						style={{
							overflow: 'hidden',
							width: '100%',
							height: '83.333333%',
						}}
					>
						<img
							style={{
								height: 'auto',
								minHeight: '100%',
								width: 'auto',
								minWidth: '100%',
							}}
							src={page.img}
							alt="recipe cover"
						/>
					</div>
					<div
						style={{
							padding: '0.5rem',
							height: '16.666667%',
						}}
					>
						<span
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							{page.icon.type === 'emoji' ? (
								<span style={{ paddingRight: '0.25rem' }} role="img">
									{JSON.parse(`"${page.icon.content}"`)}
								</span>
							) : (
								<img
									style={{
										paddingRight: '0.25rem',
										height: '23px',
										width: '23px',
									}}
									src={page.icon.content}
									alt="Recipe Logo"
								/>
							)}
							<p style={{ fontSize: '0.875rem' }}>{page.title}</p>
						</span>
					</div>
				</span>
			</a>
		</div>
	);
};
