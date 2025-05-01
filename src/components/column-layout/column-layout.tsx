import React from 'react';
import { ColumnSkeleton } from '../../internal-components';
import { ColumnLayoutProps, ColumnItem } from './column-layout.types';

export const ColumnLayout = ({ title, caption, mdcol, lgcol, items }: ColumnLayoutProps) => {
	return (
		<section className="thread-container thread-mx-auto thread-py-10 md:thread-py-8 lg:thread-py-6 thread-flex thread-flex-col thread-justify-center thread-flex-1 lg:thread-flex-none">
			{(title || caption) && (
				<div className="thread-pb-3">
					{title && (
						<h3 className="thread-text-2xl thread-font-medium thread-tracking-tight thread-text-black sm:thread-text-4xl">
							{title}
						</h3>
					)}
					{caption && <p className="thread-mt-4 thread-text-lg thread-tracking-tight thread-text-gray-600">{caption}</p>}
				</div>
			)}
			<ColumnSkeleton mdcol={mdcol || 2} lgcol={lgcol || 4}>
				{items.map((item, index) => (
					<div key={index}>
						<div className="thread-mb-6 thread-w-full thread-h-auto thread-rounded thread-overflow-hidden">
							{React.isValidElement(item.content)
								? item.content
								: 'src' in (item.content as { src: string }) && (
										<img
											src={(item.content as { src: string }).src}
											alt={(item.content as { alt: string }).alt}
											className="thread-w-full thread-h-auto thread-rounded"
										/>
									)}
						</div>
						{(item.title || item.description) && (
							<div className="thread-text-left">
								{item.title && <h2 className="thread-text-2xl ">{item.title}</h2>}
								{item.description && (
									<div className="thread-mt-6">
										<p className="thread-whitespace-pre-wrap thread-text-base">{item.description}</p>
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
