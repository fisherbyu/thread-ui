import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, IconButton, type IconNames } from '../../ui';
import { SplitView, useSplitView, type SplitViewColumn, type SplitViewProps } from '.';

type Message = { id: number; from: string; subject: string; body: string };

const folders: { name: string; icon: IconNames }[] = [
	{ name: 'Inbox', icon: 'Tray' },
	{ name: 'Archive', icon: 'Archive' },
	{ name: 'Drafts', icon: 'NotePencil' },
];

const mailbox: Record<string, Message[]> = {
	Inbox: Array.from({ length: 30 }, (_, i) => ({
		id: i,
		from: ['Ada', 'Grace', 'Linus', 'Margaret'][i % 4],
		subject: `Inbox message ${i + 1}`,
		body: `This is the body of inbox message ${i + 1}.`,
	})),
	Archive: Array.from({ length: 8 }, (_, i) => ({
		id: 100 + i,
		from: 'Archive Bot',
		subject: `Archived message ${i + 1}`,
		body: `This is the body of archived message ${i + 1}.`,
	})),
	Drafts: [{ id: 200, from: 'Me', subject: 'Unsent draft', body: 'Half-finished thoughts.' }],
};

/** Full-bleed frame so the split view has a height to fill. */
const Frame = ({ children }: { children: ReactNode }) => (
	<div style={{ width: 'calc(100vw - 48px)', height: 'calc(100vh - 48px)' }}>{children}</div>
);

type MailState = ReturnType<typeof useMail>;

/** Selection lives outside `SplitView`; items call `show` to move forward on small screens. */
const useMail = () => {
	const [folder, setFolder] = useState('Inbox');
	const [message, setMessage] = useState<Message | null>(null);
	return { folder, setFolder, message, setMessage };
};

const Folders = ({ folder, setFolder }: MailState) => {
	const { show } = useSplitView();
	return folders.map(({ name, icon }) => (
		<SplitView.Item
			key={name}
			icon={icon}
			active={name === folder}
			onClick={() => {
				setFolder(name);
				show('list');
			}}
		>
			{name}
		</SplitView.Item>
	));
};

const Messages = ({ folder, message, setMessage }: MailState) => {
	const { show } = useSplitView();
	return mailbox[folder].map((msg) => (
		<SplitView.Item
			key={msg.id}
			active={msg.id === message?.id}
			onClick={() => {
				setMessage(msg);
				show('detail');
			}}
		>
			<strong>{msg.from}</strong>
			<br />
			{msg.subject}
		</SplitView.Item>
	));
};

const MessageBody = ({ message }: MailState) => (
	<div style={{ padding: '0 16px 16px' }}>
		{message ? (
			<>
				<p style={{ marginBottom: '16px' }}>From {message.from}</p>
				<p>{message.body}</p>
			</>
		) : (
			<p>Select a message</p>
		)}
	</div>
);

const Mail = ({ mail, ...props }: Omit<SplitViewProps, 'children'> & { mail: MailState }) => (
	<SplitView {...props}>
		<SplitView.Sidebar title="Mailboxes">
			<Folders {...mail} />
		</SplitView.Sidebar>
		<SplitView.List title={mail.folder}>
			<Messages {...mail} />
		</SplitView.List>
		<SplitView.Detail
			title={mail.message?.subject}
			ariaLabel="Message"
			actions={<IconButton name="Trash" color="neutral" text ariaLabel="Delete" />}
		>
			<MessageBody {...mail} />
		</SplitView.Detail>
	</SplitView>
);

type StoryArgs = Pick<SplitViewProps, 'variant' | 'sidebarActiveColor' | 'listActiveColor'>;

const UncontrolledMail = (args: StoryArgs) => {
	const mail = useMail();
	return (
		<Frame>
			<Mail mail={mail} {...args} />
		</Frame>
	);
};

const ControlledMail = (args: StoryArgs) => {
	const mail = useMail();
	const [column, setColumn] = useState<SplitViewColumn>('list');
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
				<code>
					column: {column} · sidebarOpen: {String(sidebarOpen)}
				</code>
				{(['sidebar', 'list', 'detail'] as const).map((col) => (
					<Button key={col} size="sm" color="neutral" onClick={() => setColumn(col)}>
						{col}
					</Button>
				))}
				<Button size="sm" color="neutral" onClick={() => setSidebarOpen(!sidebarOpen)}>
					Toggle sidebar
				</Button>
			</div>
			<Frame>
				<Mail
					mail={mail}
					{...args}
					column={column}
					onColumnChange={setColumn}
					sidebarOpen={sidebarOpen}
					onSidebarOpenChange={setSidebarOpen}
				/>
			</Frame>
		</div>
	);
};

const sections: { name: string; icon: IconNames }[] = [
	{ name: 'General', icon: 'Gear' },
	{ name: 'Appearance', icon: 'Palette' },
	{ name: 'Notifications', icon: 'Bell' },
	{ name: 'Privacy', icon: 'Lock' },
];

const Sections = ({
	section,
	setSection,
}: {
	section: string;
	setSection: (s: string) => void;
}) => {
	const { show } = useSplitView();
	return sections.map(({ name, icon }) => (
		<SplitView.Item
			key={name}
			icon={icon}
			active={name === section}
			onClick={() => {
				setSection(name);
				show('detail');
			}}
		>
			{name}
		</SplitView.Item>
	));
};

const TwoColumnSettings = (args: StoryArgs) => {
	const [section, setSection] = useState(sections[0].name);

	return (
		<Frame>
			<SplitView defaultColumn="detail" {...args}>
				<SplitView.Sidebar title="Settings">
					<Sections section={section} setSection={setSection} />
				</SplitView.Sidebar>
				<SplitView.Detail title={section}>
					<p style={{ padding: '0 16px' }}>{section} settings go here.</p>
				</SplitView.Detail>
			</SplitView>
		</Frame>
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
	title: 'Layouts/SplitView',
	component: SplitView,
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

/** Resize across 1024px and 768px to see the sidebar dock, overlay, then collapse into a stack. */
export const Uncontrolled: Story = {
	render: (args) => <UncontrolledMail {...args} />,
};

/** List on the canvas, detail as its own surface card. */
export const Layered: Story = {
	args: { variant: 'layered' },
	render: (args) => <UncontrolledMail {...args} />,
};

/** Column and sidebar state owned by the story, and changed from both outside and inside. */
export const Controlled: Story = {
	render: (args) => <ControlledMail {...args} />,
};

/** Without `SplitView.List`: sidebar and detail only. */
export const TwoColumn: Story = {
	render: (args) => <TwoColumnSettings {...args} />,
};

/** Medium width: the sidebar opens as an overlay from the toggle. */
export const Medium: Story = {
	render: (args) => <UncontrolledMail {...args} />,
	globals: { viewport: { value: 'tablet', isRotated: false } },
};

/** Compact width: one column at a time with back buttons. */
export const Compact: Story = {
	render: (args) => <UncontrolledMail {...args} />,
	globals: { viewport: { value: 'mobile2', isRotated: false } },
};
