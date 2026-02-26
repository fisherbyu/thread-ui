import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonLayout } from './skeleton-layout';

const meta: Meta<typeof SkeletonLayout> = {
	title: 'Components/SkeletonLayout',
	component: SkeletonLayout,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		lgcol: {
			control: 'select',
			options: [1, 2, 3, 4],
		},
		mdcol: {
			control: 'select',
			options: [1, 2, 3, 4],
		},
		rows: {
			control: 'number',
		},
	},
};

export default meta;
type Story = StoryObj<typeof SkeletonLayout>;

export const Default: Story = {
	args: {
		lgcol: 3,
		mdcol: 2,
		rows: 3,
		itemConfig: { w: '100%', h: '50px' },
	},
};

export const SingleColumn: Story = {
	args: {
		lgcol: 1,
		mdcol: 1,
		rows: 4,
		itemConfig: { w: '100%', h: '50px' },
	},
};
