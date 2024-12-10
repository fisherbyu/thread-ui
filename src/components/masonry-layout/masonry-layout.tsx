import { MasonryLayoutProps } from './masonry-layout.types';

export const MasonryLayout = ({ title, caption, components }: MasonryLayoutProps) => {
	return (
		<section data-testid="masonry" className="container">
			{title && <h3 className="text-2xl font-normal tracking-tight text-black sm:text-4xl">{title}</h3>}
			{caption && <p className="mt-4 text-lg tracking-tight text-gray-600">{caption}</p>}
			<div>
				<ol className=" mt-2 columns-2 md:columns-3 lg:columns-4 gap-x-2">
					{components.map((component, index) => (
						<li key={index} className="w-full inline-block rounded overflow-hidden">
							{component}
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};
