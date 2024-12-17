import { MasonryLayoutProps } from './masonry-layout.types';

export const MasonryLayout = ({ title, caption, components }: MasonryLayoutProps) => {
	return (
		<section data-testid="masonry" className="thread-container">
			{title && (
				<h3 className="thread-text-2xl thread-font-normal thread-tracking-tight thread-text-black sm:thread-text-4xl">
					{title}
				</h3>
			)}
			{caption && <p className="thread-mt-4 thread-text-lg thread-tracking-tight thread-text-gray-600">{caption}</p>}
			<div>
				<ol className=" thread-mt-2 thread-columns-2 md:thread-columns-3 lg:thread-columns-4 thread-gap-x-2">
					{components.map((component, index) => (
						<li key={index} className="thread-w-full thread-inline-block thread-rounded thread-overflow-hidden">
							{component}
						</li>
					))}
				</ol>
			</div>
		</section>
	);
};
