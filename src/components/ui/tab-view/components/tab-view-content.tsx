import { TabViewControls } from './tab-display';
import { TabViewActiveContent } from './tab-view-active-content';

export const TabViewContent = () => {
	return (
		<div>
			<TabViewControls />
			<TabViewActiveContent />
		</div>
	);
};
