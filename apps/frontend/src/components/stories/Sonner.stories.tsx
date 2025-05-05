import { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Toaster } from '../ui/sonner'
import StoryWrapper from './StoryWrapper'

const meta: Meta<typeof Toaster> = {
  title: 'UI/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Story />
          </div>
        </div>
      </StoryWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toaster>

// We'll create action buttons that trigger different types of toasts
export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => toast('This is a default toast notification')}>
          Default Toast
        </Button>
        <Button onClick={() => toast.success('Action completed successfully!')}>
          Success Toast
        </Button>
        <Button onClick={() => toast.error('An error occurred')}>
          Error Toast
        </Button>
        <Button
          onClick={() => toast.warning('Warning: This action cannot be undone')}
        >
          Warning Toast
        </Button>
        <Button onClick={() => toast.info('New update available')}>
          Info Toast
        </Button>
      </div>
    </>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('File uploaded', {
              description:
                'Your file has been uploaded successfully and is now processing',
            })
          }
        >
          With Description
        </Button>
      </div>
    </>
  ),
}

export const WithActions: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('File deleted', {
              description: 'The file has been moved to trash',
              action: {
                label: 'Undo',
                onClick: () => toast.success('Deletion undone!'),
              },
            })
          }
        >
          With Action
        </Button>
        <Button
          onClick={() =>
            toast('Multiple actions', {
              description: 'You can add multiple actions to a toast',
              action: {
                label: 'Accept',
                onClick: () => toast.success('Accepted!'),
              },
              cancel: {
                label: 'Cancel',
                onClick: () => toast.error('Cancelled!'),
              },
            })
          }
        >
          Multiple Actions
        </Button>
      </div>
    </>
  ),
}

export const CustomDuration: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('Short toast', {
              description: 'This toast will dismiss in 2 seconds',
              duration: 2000,
            })
          }
        >
          Short Duration (2s)
        </Button>
        <Button
          onClick={() =>
            toast('Long toast', {
              description: 'This toast will dismiss in 10 seconds',
              duration: 10000,
            })
          }
        >
          Long Duration (10s)
        </Button>
        <Button
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: 'Loading...',
              success: 'Promise resolved successfully!',
              error: 'Promise rejected',
            })
          }
        >
          Promise Toast
        </Button>
      </div>
    </>
  ),
}

export const CustomPosition: Story = {
  render: () => (
    <>
      <Toaster position="top-left" />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('Top Left', {
              description: 'This toast appears in the top-left corner',
            })
          }
        >
          Show Toast
        </Button>
      </div>
    </>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('Custom styled toast', {
              className: 'bg-blue-500 text-white border-none',
              description: 'This toast has custom styling',
              descriptionClassName: 'text-blue-100',
            })
          }
        >
          Custom Style
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast('Important notification', {
              description: 'This toast will not automatically dismiss',
            })
          }
        >
          Important (No Auto-dismiss)
        </Button>
      </div>
    </>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('Toast with icon', {
              description: 'This toast includes a custom icon',
              icon: <span className="text-blue-500 text-lg">🚀</span>,
            })
          }
        >
          With Icon
        </Button>
      </div>
    </>
  ),
}

export const CustomClose: Story = {
  render: () => (
    <>
      <Toaster closeButton />
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            toast('Dismissible toast', {
              description: 'This toast has a close button',
            })
          }
        >
          With Close Button
        </Button>
      </div>
    </>
  ),
}
