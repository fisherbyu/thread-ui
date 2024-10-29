import React from 'react';

import { NavItemProps } from './nav-item.types';
import { Link } from '../../../../internal-components';
import { useTheme } from '../../../../utils/theme/theme-provider';

export const NavItem = ({ title, href }: NavItemProps) => {
	const theme = useTheme();

	const styles = {
		// container: {
		// 	display: 'inline-flex',
		// 	height: '2.5rem',
		// 	alignItems: 'center',
		// 	justifyContent: 'center',
		// 	borderRadius: '0.375rem',
		// 	backgroundColor: theme.colors.background.light,
		// 	fontSize: '0.875rem',
		// 	fontWeight: 500,
		// 	// transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
		// },

		link: {
			display: 'inline-flex',
			height: '2.5rem',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '0.375rem',
			backgroundColor: theme.colors.background.light,
			color: theme.colors.text.light.primary,
			fontSize: '0.875rem',
			fontWeight: 500,
			padding: '0.5rem 1rem',
			width: 'fit-content',
			textDecoration: 'none',
			transition: 'all 150ms ease-in-out',
		},

		linkHover: {
			backgroundColor: theme.colors.gray.light,
			color: theme.colors.primary.medium,
		},
	};

	// Handle hover state
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<li style={{ listStyleType: 'none' }}>
			<Link
				href={href}
				style={{
					...styles.link,
					...(isHovered ? styles.linkHover : {}),
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{title}
			</Link>
		</li>
	);
};

// // Logo variant
// export const LogoNavItem = ({ title, href }: NavItemProps) => {
// 	const NavItemComponent = <NavItem title={title} href={href} />;
// 	return React.cloneElement(NavItemComponent, {
// 		style: {
// 			...NavItemComponent.props.style,
// 			width: 'fit-content',
// 		},
// 	});
// };

// // Dropdown variant
// export const DropdownNavItem = ({ title, href }: NavItemProps) => {
// 	const NavItemComponent = <NavItem title={title} href={href} />;
// 	return React.cloneElement(NavItemComponent, {
// 		style: {
// 			...NavItemComponent.props.style,
// 			width: '66.666667%', // equivalent to w-8/12
// 		},
// 	});
// };

// // Optional: Create a reusable hook for the styles
// export const useNavItemStyles = () => {
// 	const theme = useTheme();

// 	return React.useMemo(
// 		() => ({
// 			container: {
// 				display: 'inline-flex',
// 				height: '2.5rem',
// 				alignItems: 'center',
// 				justifyContent: 'center',
// 				borderRadius: '0.375rem',
// 				backgroundColor: theme.colors.background.light,
// 				fontSize: '0.875rem',
// 				fontWeight: 500,
// 				transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
// 			},
// 			link: {
// 				display: 'inline-flex',
// 				height: '2.5rem',
// 				alignItems: 'center',
// 				justifyContent: 'center',
// 				borderRadius: '0.375rem',
// 				backgroundColor: theme.colors.background.light,
// 				color: theme.colors.text.light.primary,
// 				fontSize: '0.875rem',
// 				fontWeight: 500,
// 				padding: '0.5rem 1rem',
// 				width: '100%',
// 				textDecoration: 'none',
// 				transition: 'all 150ms ease-in-out',
// 			},
// 			linkHover: {
// 				backgroundColor: theme.colors.gray.light,
// 				color: theme.colors.primary.medium,
// 			},
// 		}),
// 		[theme]
// 	);
// };