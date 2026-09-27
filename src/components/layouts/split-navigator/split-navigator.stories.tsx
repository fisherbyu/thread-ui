import {
	useEffect,
	useState,
	type ComponentPropsWithRef,
	type MouseEvent,
	type ReactNode,
} from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThreadProvider } from '../../../foundation';
import { usePathname } from '../../../hooks';
import { Button, IconButton } from '../../ui';
import { SplitNavigator } from './split-navigator';
import type { SplitNavigatorProps, SplitNavigatorSection } from './split-navigator.types';

type Message = { id: number; from: string; subject: string; body: string };

const sections: SplitNavigatorSection[] = [
	{ id: 'inbox', title: 'Inbox', icon: 'Tray' },
	{ id: 'archive', title: 'Archive', icon: 'Archive' },
	{ id: 'drafts', title: 'Drafts', icon: 'NotePencil' },
	{ id: 'spam', title: 'Spam', icon: 'Warning' },
];

const mailbox: Record<string, Message[]> = {
	inbox: Array.from({ length: 30 }, (_, i) => ({
		id: i + 1,
		from: ['Ada', 'Grace', 'Linus', 'Margaret'][i % 4],
		subject: `Inbox message ${i + 1}`,
		body: `This is the body of inbox message ${i + 1}.`,
	})),
	archive: Array.from({ length: 8 }, (_, i) => ({
		id: 100 + i,
		from: 'Archive Bot',
		subject: `Archived message ${i + 1}`,
		body: `This is the body of archived message ${i + 1}.`,
	})),
	drafts: [{ id: 200, from: 'Me', subject: 'Unsent draft', body: 'Half-finished thoughts.' }],
	spam: [],
};

/** Full-bleed frame so the browser has a height to fill. */
const Frame = ({ children }: { children: ReactNode }) => (
	<div style={{ width: 'calc(100vw - 48px)', height: 'calc(100vh - 48px)' }}>{children}</div>
);

/** Props shared by every story: how messages render. */
const mailProps = {
	sections,
	sidebarTitle: 'Mailboxes',
	sidebarFooter: (
		<Button size="sm" color="secondary" text>
			Sign out
		</Button>
	),
	renderItem: (msg: Message) => (
		<>
			<strong>{msg.from}</strong>
			<br />
			{msg.subject}
		</>
	),
	renderDetail: (msg: Message) => (
		<div style={{ padding: '0 16px 16px' }}>
			<p style={{ marginBottom: '16px' }}>From {msg.from}</p>
			<p>{msg.body}</p>
		</div>
	),
	detailTitle: (msg: Message) => msg.subject,
	detailActions: () => <IconButton name="Trash" color="neutral" text ariaLabel="Delete" />,
	emptyList: 'No messages',
	emptyDetail: 'Select a message',
} satisfies Partial<SplitNavigatorProps<Message>>;

type StoryArgs = Pick<
	SplitNavigatorProps<Message>,
	'variant' | 'sidebarActiveColor' | 'listActiveColor'
>;

/** The browser owns selection; only the list's items follow the section. */
const UncontrolledMail = (args: StoryArgs) => {
	const [section, setSection] = useState('inbox');
	return (
		<Frame>
			<SplitNavigator
				{...mailProps}
				{...args}
				items={mailbox[section]}
				onSectionChange={setSection}
			/>
		</Frame>
	);
};

/** Adds a Settings section with `hideList`: one item, shown in the detail with a pinned footer. */
const HiddenListMail = (args: StoryArgs) => {
	const [section, setSection] = useState('settings');
	const settings: Message = { id: 999, from: 'Me', subject: 'Settings', body: '' };

	return (
		<Frame>
			<SplitNavigator
				{...mailProps}
				{...args}
				sections={[
					...sections,
					{ id: 'settings', title: 'Settings', icon: 'Gear', hideList: true },
				]}
				items={section === 'settings' ? [settings] : mailbox[section]}
				defaultSection="settings"
				onSectionChange={setSection}
				renderDetail={(msg) =>
					msg.id === settings.id ? (
						<div style={{ padding: '0 16px 16px' }}>
							{Array.from({ length: 40 }, (_, i) => (
								<p key={i} style={{ marginBottom: '12px' }}>
									Setting {i + 1}
								</p>
							))}
						</div>
					) : (
						mailProps.renderDetail(msg)
					)
				}
				detailFooter={(msg) =>
					msg.id === settings.id && <Button size="sm">Save settings</Button>
				}
			/>
		</Frame>
	);
};

const ControlledMail = (args: StoryArgs) => {
	const [section, setSection] = useState('inbox');
	const [item, setItem] = useState<number | null>(3);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
				<code>
					section: {section} · item: {String(item)}
				</code>
				<Button
					size="sm"
					color="neutral"
					onClick={() => setItem(item === null ? 1 : item + 1)}
				>
					Next message
				</Button>
				<Button
					size="sm"
					color="neutral"
					onClick={() => {
						setSection('drafts');
						setItem(200);
					}}
				>
					Open draft
				</Button>
				<Button size="sm" color="neutral" onClick={() => setItem(null)}>
					Clear
				</Button>
			</div>
			<Frame>
				<SplitNavigator
					{...mailProps}
					{...args}
					items={mailbox[section]}
					section={section}
					onSectionChange={setSection}
					item={item}
					onItemChange={setItem}
				/>
			</Frame>
		</div>
	);
};

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

/** Selection comes from the URL (`/mail/:section/:item`); entries are links. */
const RoutedMail = (args: StoryArgs) => {
	const pathname = usePathname();
	const [, , sectionId = 'inbox', itemId] = pathname.split('/');
	const item = itemId ? Number(itemId) : null;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<code>path: {pathname}</code>
				<Button size="sm" color="neutral" onClick={() => window.history.back()}>
					Browser back
				</Button>
			</div>
			<Frame>
				<SplitNavigator
					{...mailProps}
					{...args}
					items={mailbox[sectionId] ?? []}
					section={sectionId}
					item={item}
					getSectionHref={(section) => `/mail/${section.id}`}
					getItemHref={(msg, section) => `/mail/${section.id}/${msg.id}`}
				/>
			</Frame>
		</div>
	);
};

const colorOptions = [
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
];

const meta: Meta<StoryArgs> = {
	title: 'Layouts/SplitNavigator',
	component: SplitNavigator,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	args: { variant: 'floating', sidebarActiveColor: 'primary', listActiveColor: 'neutral' },
	argTypes: {
		variant: { control: 'radio', options: ['floating', 'layered'] },
		sidebarActiveColor: { control: 'select', options: colorOptions },
		listActiveColor: { control: 'select', options: colorOptions },
	},
};

export default meta;
type Story = StoryObj<StoryArgs>;

/** Selection tracked internally. Spam is empty to show `emptyList`. */
export const Uncontrolled: Story = {
	render: (args) => <UncontrolledMail {...args} />,
};

/** Section and item owned by the story and changed from outside; compact mode follows. */
export const Controlled: Story = {
	render: (args) => <ControlledMail {...args} />,
};

/** Router-driven: entries are links, selection is read from the path, browser back works. */
export const Routed: Story = {
	decorators: [
		(Story) => {
			// Start the iframe at the mailbox path, and restore Storybook's real URL on the way out
			useEffect(() => {
				const originalUrl = `${window.location.pathname}${window.location.search}`;
				window.history.replaceState(null, '', `/mail/inbox${window.location.search}`);
				return () => window.history.replaceState(null, '', originalUrl);
			}, []);

			return (
				<ThreadProvider linkComponent={StoryRouterLink}>
					<Story />
				</ThreadProvider>
			);
		},
	],
	render: (args) => <RoutedMail {...args} />,
};

/** Opens on Settings, which uses `hideList`: its one item fills the detail, with a pinned footer. Other sections keep their lists. */
export const HiddenList: Story = {
	render: (args) => <HiddenListMail {...args} />,
};

/** Compact width: selecting pushes columns; the back buttons pop them. */
export const Compact: Story = {
	render: (args) => <UncontrolledMail {...args} />,
	globals: { viewport: { value: 'mobile2', isRotated: false } },
};
