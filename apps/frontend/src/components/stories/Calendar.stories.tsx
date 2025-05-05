import { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'The selection mode of the calendar',
    },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    initialFocus: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Creating simplified non-hook versions for Storybook
export const SingleMode: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    className: 'rounded-md border',
  },
};

export const RangeMode: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    className: 'rounded-md border',
  },
};

export const MultipleMode: Story = {
  args: {
    mode: 'multiple',
    selected: [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 5)),
      new Date(new Date().setDate(new Date().getDate() + 10)),
    ],
    className: 'rounded-md border',
  },
};

export const DisabledCalendar: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    disabled: true,
    className: 'rounded-md border',
  },
};
