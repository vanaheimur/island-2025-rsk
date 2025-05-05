import { Meta, StoryObj } from '@storybook/react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
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
    type: { 
      control: 'select', 
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'The type of the input element',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    type: 'text',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'Default value',
  },
};

export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-error">Email</Label>
      <Input 
        type="email" 
        id="email-error" 
        placeholder="name@example.com"
        className="border-red-500" 
      />
      <p className="text-sm text-red-500">Please enter a valid email address.</p>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Input type="search" placeholder="Search..." className="pl-8" />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </div>
  ),
};
