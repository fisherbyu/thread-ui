import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReorderableList } from './reorderable-list';

const meta: Meta<typeof ReorderableList> = {
  title: 'Components/ReorderableList',
  component: ReorderableList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Add your prop controls here
  },
};

export default meta;

type Story = StoryObj<typeof ReorderableList>;

export const Default: Story = {
  args: {},
};
