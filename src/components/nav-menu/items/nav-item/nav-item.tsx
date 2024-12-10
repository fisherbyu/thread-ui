import { NavItemProps } from './nav-item.types';
import { BaseItem } from '../base-item';

export const NavItem = ({ href, title }: NavItemProps) => {
	const style = {
		block: {
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	};
	return (
		<>
			<BaseItem href={href}>{title}</BaseItem>
		</>
	);
};
