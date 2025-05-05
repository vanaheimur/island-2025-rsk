import { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
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
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup disabled defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d-option-one" />
        <Label htmlFor="d-option-one" className="text-muted-foreground">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d-option-two" />
        <Label htmlFor="d-option-two" className="text-muted-foreground">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="default" id="r1" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="r1">Default</Label>
          <p className="text-sm text-muted-foreground">
            The default system settings.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="comfortable" id="r2" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="r2">Comfortable</Label>
          <p className="text-sm text-muted-foreground">
            Optimized for comfort with larger UI elements.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="compact" id="r3" className="mt-1" />
        <div className="grid gap-1">
          <Label htmlFor="r3">Compact</Label>
          <p className="text-sm text-muted-foreground">
            For experienced users, showing more content.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="flex gap-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="h-option-one" />
        <Label htmlFor="h-option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="h-option-two" />
        <Label htmlFor="h-option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="h-option-three" />
        <Label htmlFor="h-option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

// Simplifying to avoid React hooks in Storybook stories
export const Controlled: Story = {
  render: () => (
    <div className="space-y-4">
      <RadioGroup value="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="c-option-one" />
          <Label htmlFor="c-option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="c-option-two" />
          <Label htmlFor="c-option-two">Option Two</Label>
        </div>
      </RadioGroup>
      <div className="text-sm">Selected value: option-one</div>
    </div>
  ),
};
