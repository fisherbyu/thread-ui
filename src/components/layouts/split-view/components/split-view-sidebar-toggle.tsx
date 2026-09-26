'use client';
import { css } from '@/styled-system/css';
import { IconButton } from '@/components/ui';
import { useSplitView } from '../split-view-context';
import { SplitViewSidebarToggleProps } from '../split-view.types';

const styles = {
	wrapper: css({ display: 'contents', mdDown: { display: 'none' } }),
};

/** Shows or hides the sidebar. Hidden in compact mode, where `SplitView.BackButton` navigates instead. */
export const SplitViewSidebarToggle = ({
	ariaLabel = 'Toggle sidebar',
}: SplitViewSidebarToggleProps) => {
	const { sidebarOpen, toggleSidebar } = useSplitView();

	return (
		<span className={styles.wrapper}>
			<IconButton
				name="SidebarSimple"
				color="neutral"
				text
				ariaLabel={ariaLabel}
				aria-expanded={sidebarOpen}
				onClick={toggleSidebar}
				filled={sidebarOpen}
			/>
		</span>
	);
};
