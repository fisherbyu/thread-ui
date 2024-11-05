import { useState } from 'react';
import { BaseItem } from '../base-item';
import { NavDropdownItemProps } from './nav-drop-down-item.types';

export const NavDropdownItem = ({ title, items }: NavDropdownItemProps) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<BaseItem href="href" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{title}
			<div
				className=" border"
				id="dropdownContent"
				style={{
					width: 'calc(100%)',
					height: 'fit-content',
					position: 'relative',
					left: '-33px',
					top: '-9px',
					display: 'flex',
					flexDirection: 'column',
					gap: '22px',
				}}
			>
				<div id="spacer" style={{ height: '22px', width: '100%' }}></div>
				<div id="DropdownItems" style={{ height: '20px', width: '100%' }}>
					{items.map((item) => (
						<BaseItem href={item.href}>{item.title}</BaseItem>
					))}
				</div>
			</div>
		</BaseItem>
	);
};
