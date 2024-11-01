import { BaseItem } from '../base-item';
import { NavIconItemProps } from './nav-icon-item.types';

export const NavIconItem = ({ href, logo }: NavIconItemProps) => {
	return (
		<>
			<BaseItem href={href} padding="4px 16px">
				{logo}
			</BaseItem>
		</>
	);
};
