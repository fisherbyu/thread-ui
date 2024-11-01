import { CSSProperties } from 'react';
import { NavMenuProps } from './nav-menu.types';
import { useTheme } from '../../utils';

export const NavMenu = ({ logo, items }: NavMenuProps) => {
	const theme = useTheme();
	const style: Record<string, CSSProperties> = {
		header: {
			position: 'sticky',
			top: '0px',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			height: '80px',
			backdropFilter: 'blur(24px)',
			borderBottomWidth: '1px',
			borderBottomColor: theme.colors.structure.light,
			zIndex: '40',
			backgroundColor: theme.colors.background.light,
		},
	};

	return (
		<>
			<header id="site-menu" style={style.header}>
				<nav className=" container relative mx-auto w-full flex gap-x-5 justify-between lg:justify-start items-center"></nav>
			</header>
		</>
	);
};

// className=" dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl"
