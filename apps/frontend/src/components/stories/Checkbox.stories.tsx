import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
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
    checked: { 
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    defaultChecked: { 
      control: 'boolean',
      description: 'Whether the checkbox is checked by default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checked by default</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="text-muted-foreground">
        Disabled checkbox
      </Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled-checked" disabled defaultChecked />
      <Label htmlFor="disabled-checked" className="text-muted-foreground">
        Disabled and checked
      </Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms1">Accept terms and conditions</Label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};
