import { useEffect, useState, type ComponentPropsWithRef, type MouseEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThreadProvider } from '../../../foundation';
import { usePathname } from '../../../hooks';
import { IconButton } from '../../ui';
import { SideNav } from './side-nav';

/**
 * Stand-in for a router's Link: navigates with `history.pushState` (like Next.js / React Router)
 * instead of a full page load. The iframe's query string is kept so Storybook keeps working.
 */
const StoryRouterLink = ({ href = '', onClick, ...props }: ComponentPropsWithRef<'a'>) => {
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		onClick?.(event);
		event.preventDefault();
		window.history.pushState(null, '', `${href}${window.location.search}`);
	};

	return <a href={href} onClick={handleClick} {...props} />;
};

const CurrentPath = () => {
	const pathname = usePathname();
	return (
		<p style={{ fontFamily: 'monospace', fontSize: '12px' }}>
			Current path: <strong>{pathname}</strong>
		</p>
	);
};

const meta: Meta<typeof SideNav> = {
	title: 'Navigation/SideNav',
	component: SideNav,
	tags: ['autodocs'],
	argTypes: {
		activeColor: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'tertiary',
				'black',
				'gray',
				'success',
				'error',
				'warning',
				'info',
				'text',
				'neutral',
			],
		},
	},
	decorators: [
		(Story, { args }) => {
			// Start the iframe at the nav's base path, and restore Storybook's real URL on the way out
			useEffect(() => {
				const originalUrl = `${window.location.pathname}${window.location.search}`;
				window.history.replaceState(
					null,
					'',
					`${args.basePath || '/'}${window.location.search}`
				);
				return () => window.history.replaceState(null, '', originalUrl);
			}, [args.basePath]);

			return (
				<ThreadProvider linkComponent={StoryRouterLink}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
							minWidth: '250px',
						}}
					>
						<CurrentPath />
						<Story />
					</div>
				</ThreadProvider>
			);
		},
	],
};

export default meta;
type Story = StoryObj<typeof SideNav>;

export const Default: Story = {
	args: {
		basePath: '/dashboard',
		activeColor: 'primary',
		links: [
			{ title: 'Home', path: '/', icon: 'House' },
			{ title: 'Documents', path: '/documents', icon: 'File' },
			{ title: 'Controls', path: '/controls', icon: 'Gear' },
		],
	},
};

/** Labels only show at the `lg` breakpoint (1024px), so force a desktop-width viewport. */
export const Expanded: Story = {
	...Default,
	globals: {
		viewport: { value: 'desktop', isRotated: false },
	},
};

/** `collapsed` forces the icon-only rail at any viewport width. */
export const Collapsed: Story = {
	...Expanded,
	args: { ...Default.args, collapsed: true },
};

/** Controlled from app state, with a toggle passed in through `controls`. */
export const Toggleable: Story = {
	...Expanded,
	render: (args) => {
		const [collapsed, setCollapsed] = useState(false);
		return (
			<SideNav
				{...args}
				collapsed={collapsed}
				controls={
					<IconButton
						name="SidebarSimple"
						color="neutral"
						text
						ariaLabel={collapsed ? 'Expand navigation' : 'Collapse navigation'}
						aria-expanded={!collapsed}
						onClick={() => setCollapsed(!collapsed)}
					/>
				}
			/>
		);
	},
};
