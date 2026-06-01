import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './gallery';

const meta: Meta<typeof Gallery> = {
  title: 'Components/Gallery',
  component: Gallery,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Add your prop controls here
  },
};

export default meta;

type Story = StoryObj<typeof Gallery>;

export const Default: Story = {
  args: {},
};
