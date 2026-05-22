import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabView } from './tab-view';

const meta: Meta<typeof TabView> = {
  title: 'Components/TabView',
  component: TabView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Add your prop controls here
  },
};

export default meta;

type Story = StoryObj<typeof TabView>;

export const Default: Story = {
  args: {},
};
