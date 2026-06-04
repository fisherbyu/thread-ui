'use client';
import { css } from '@/styled-system/css';
import { Card } from '@/components/ui';
import { ConditionalWrapper } from '../../../../internal-components';
import { useTabViewContext } from '../tab-view-context';
import { TabViewControls } from './tab-view-controls';
import { H3 } from '@/components/typography';
import { TabItemId } from '../tab-view.types';

type TabItemContentProps = {
	itemId: TabItemId;
};

const styles = {
	content: css({ width: '100%' }),
};

export const TabItemContent = ({ itemId }: TabItemContentProps) => {
	const {
		value: { activeItemId, items, unmountInactive, cardStyles, title },
	} = useTabViewContext();

	const isActive = activeItemId === itemId;

	if (unmountInactive && !isActive) {
		return null;
	}

	const item = items[itemId];

	const titleBlock = typeof title === 'string' ? <H3>{title}</H3> : title;

	return (
		<div hidden={!isActive}>
			<ConditionalWrapper
				wrapper={cardStyles === 'none' ? 'div' : Card}
				wrapperProps={
					cardStyles === 'none'
						? { className: styles.content }
						: { layer: cardStyles, fullWidth: true }
				}
			>
				{title && titleBlock}
				<TabViewControls />
				{item.content}
			</ConditionalWrapper>
		</div>
	);
};
