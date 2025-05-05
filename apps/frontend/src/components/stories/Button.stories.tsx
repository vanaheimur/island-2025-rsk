import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui/button';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render the button as a child element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'default',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'default',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    children: '→',
    size: 'icon',
    'aria-label': 'Icon button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
