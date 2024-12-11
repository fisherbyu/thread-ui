import React from 'react';
import { ColumnSkeleton } from '../../internal-components';
import { ColumnLayoutProps, ColumnItem } from './column-layout.types';

export const ColumnLayout = ({ title, caption, mdcol, lgcol, items }: ColumnLayoutProps) => {
	return (
		<section className="container mx-auto py-10 md:py-8 lg:py-6 flex flex-col justify-center flex-1 lg:flex-none">
			{title && <h3 className="text-2xl font-medium tracking-tight text-black sm:text-4xl">{title}</h3>}
			{caption && <p className="mt-4 text-lg tracking-tight text-gray-600">{caption}</p>}
			<ColumnSkeleton mdcol={mdcol || 2} lgcol={lgcol || 4}>
				{items.map((item, index) => (
					<div key={index}>
						<div className="mb-6 w-full h-auto rounded overflow-hidden">
							{React.isValidElement(item.image)
								? item.image
								: 'src' in (item.image as { src: string }) && (
										<img
											src={(item.image as { src: string }).src}
											alt={(item.image as { alt: string }).alt}
											className="w-full h-auto rounded"
										/>
									)}
						</div>
						{(item.title || item.description) && (
							<div className="text-left">
								{item.title && <h2 className="text-2xl ">{item.title}</h2>}
								{item.description && (
									<div className="mt-6">
										<p className="whitespace-pre-wrap text-base">{item.description}</p>
									</div>
								)}
							</div>
						)}
					</div>
				))}
			</ColumnSkeleton>
		</section>
	);
};
