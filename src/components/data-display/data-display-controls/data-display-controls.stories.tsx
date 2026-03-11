import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataDisplayControls } from './data-display-controls';

const meta: Meta<typeof DataDisplayControls> = {
  title: 'Components/DataDisplayControls',
  component: DataDisplayControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Add your prop controls here
  },
};

export default meta;

type Story = StoryObj<typeof DataDisplayControls>;

export const Default: Story = {
  args: {},
};
