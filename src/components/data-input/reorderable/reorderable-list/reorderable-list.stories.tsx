import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReorderableList } from './reorderable-list';
import type { ReorderableListProps } from './reorderable-list.types';
import type { ReorderableItemProps } from './sortable-item';
import { Text } from '../../typography';

type Task = { id: number; title: string; done: boolean; order: number };

const initialTasks: Task[] = [
	{ id: 1, title: 'Draft proposal', done: false, order: 0 },
	{ id: 2, title: 'Review designs', done: true, order: 1 },
	{ id: 3, title: 'Update changelog', done: false, order: 2 },
	{ id: 4, title: 'Publish release', done: false, order: 3 },
];

const getTaskLabel = (task: Task) => task.title;

const TaskRow = ({ item, dragHandle, onItemChange }: ReorderableItemProps<Task>) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8 }}>
		{dragHandle}
		<input
			type="checkbox"
			checked={item.done}
			onChange={(e) => onItemChange({ ...item, done: e.target.checked })}
		/>
		<Text size="sm">{item.title}</Text>
	</div>
);

const Demo = ({ title, size }: Pick<ReorderableListProps<Task>, 'title' | 'size'>) => {
	const [tasks, setTasks] = useState(initialTasks);
	return (
		<ReorderableList
			name="taskOrder"
			title={title}
			size={size}
			value={tasks}
			orderProperty="order"
			ItemComponent={TaskRow}
			onChange={setTasks}
			getItemLabel={getTaskLabel}
		/>
	);
};

const meta: Meta<typeof ReorderableList> = {
	title: 'Data Input/ReorderableList',
	component: ReorderableList,
	parameters: { layout: 'padded' },
	argTypes: {
		title: { control: 'text' },
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
	},
	args: {
		title: 'Tasks',
		size: 'md',
	},
};

export default meta;
type Story = StoryObj<typeof ReorderableList>;

export const Default: Story = {
	render: ({ title, size }: any) => <Demo title={title} size={size} />,
};
