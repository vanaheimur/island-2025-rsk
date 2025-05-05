import { Meta, StoryObj } from '@storybook/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
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
    htmlFor: { control: 'text' },
    // Removing disabled prop since it's not directly supported
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Label Text',
    htmlFor: 'field',
  },
  render: ({ children, ...args }) => (
    <div className="grid gap-1.5">
      <Label {...args}>{children}</Label>
      <Input id={args.htmlFor} placeholder="Input field" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <div className="flex items-center gap-1">
        <Label htmlFor="required">Username</Label>
        <span className="text-red-500">*</span>
      </div>
      <Input id="required" placeholder="Username" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-1.5 group" data-disabled="true">
      <Label htmlFor="disabled">Disabled Label</Label>
      <Input id="disabled" disabled placeholder="Disabled input" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
      <p className="text-sm text-muted-foreground">
        We'll never share your email with anyone else.
      </p>
    </div>
  ),
};
