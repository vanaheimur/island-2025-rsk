import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
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
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea 
        id="message" 
        placeholder="Type your message here..." 
        rows={4}
      />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    rows: 4,
  },
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <div className="flex items-center gap-1">
        <Label htmlFor="required-message">Your message</Label>
        <span className="text-red-500">*</span>
      </div>
      <Textarea 
        id="required-message" 
        placeholder="This field is required" 
        required 
        rows={4}
      />
      <p className="text-xs text-muted-foreground">Please enter a message.</p>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="error-message">Your message</Label>
      <Textarea 
        id="error-message" 
        placeholder="Type your message here..." 
        className="border-red-500" 
        aria-invalid="true"
        rows={4}
      />
      <p className="text-sm text-red-500">Your message must be at least 20 characters.</p>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="with-count">Your message</Label>
      <div className="relative">
        <Textarea 
          id="with-count" 
          placeholder="Type your message here..." 
          defaultValue="This is a sample text to demonstrate character count."
          rows={4}
        />
        <div className="absolute bottom-1.5 right-2 text-xs text-muted-foreground">
          56/280
        </div>
      </div>
    </div>
  ),
};

export const Resizable: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="resizable">Resizable textarea</Label>
      <Textarea 
        id="resizable" 
        placeholder="This textarea can be resized..."
        className="resize-y min-h-[100px]"
      />
    </div>
  ),
};
