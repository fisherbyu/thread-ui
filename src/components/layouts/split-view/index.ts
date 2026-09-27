import { SplitViewRoot } from './split-view';
import { SplitViewSidebar, SplitViewList, SplitViewDetail } from './components/split-view-panes';
import { SplitViewBackButton } from './components/split-view-back-button';
import { SplitViewSidebarToggle } from './components/split-view-sidebar-toggle';
import { SplitViewItem } from './components/split-view-item';

export type {
	SplitViewProps,
	SplitViewColumn,
	SplitViewColumnProps,
	SplitViewItemProps,
	SplitViewVariant,
	SplitViewActiveColor,
	SplitViewMode,
	SplitViewState,
	SplitViewBackButtonProps,
	SplitViewSidebarToggleProps,
} from './split-view.types';
export { useSplitView } from './split-view-context';

export const SplitView = Object.assign(SplitViewRoot, {
	Sidebar: SplitViewSidebar,
	List: SplitViewList,
	Detail: SplitViewDetail,
	Item: SplitViewItem,
	BackButton: SplitViewBackButton,
	SidebarToggle: SplitViewSidebarToggle,
});
