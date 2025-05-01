import { ImagePanelProps } from './image-panel.types';
import { renderImage } from '../../internal-components';
import { Subtitle, Text, Title } from '../typography';

export const ImagePanel = ({ title, subtitle, contents, image, smImage, contentBelow, contentLeft }: ImagePanelProps) => {
	return (
		<div className="thread-container">
			<div className="thread-flex thread-flex-col lg:thread-flex-row thread-justify-center thread-items-stretch">
				<div className="thread-mt-6 md:thread-mt-8 lg:thread-mt-0 lg:thread-w-8/12 ">
					<div className="thread-relative thread-w-full thread-h-full">{renderImage(image)}</div>
				</div>
				<div className="thread-flex thread-justify-center thread-items-center thread-order-first md:thread-mx-auto md:thread-w-11/12 md:thread-mt-12 lg:thread-w-5/12 lg:thread-px-6 lg:thread-order-none">
					<div>
						<Title inline>
							{title}
							{subtitle && <Subtitle>{subtitle}</Subtitle>}
						</Title>
						{contents?.map((txt) => <Text>{txt}</Text>)}
					</div>
				</div>
			</div>
		</div>
	);
};
