import { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '../ui/skeleton'
import StoryWrapper from './StoryWrapper'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <div className="flex flex-col gap-8 w-full max-w-[600px]">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
}

export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
}

export const Square: Story = {
  render: () => <Skeleton className="h-12 w-12" />,
}

export const Card: Story = {
  render: () => (
    <div className="space-y-5">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
}

export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
}

export const Form: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[160px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[130px]" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-[120px]" />
    </div>
  ),
}

export const TableRows: Story = {
  render: () => (
    <div className="w-full space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[220px]" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="space-y-2 border rounded-lg p-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
        </div>
        <div className="space-y-2 border rounded-lg p-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
        </div>
        <div className="space-y-2 border rounded-lg p-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
        </div>
      </div>
      
      {/* Chart */}
      <div className="space-y-2 pt-4">
        <Skeleton className="h-5 w-[140px]" />
        <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
      
      {/* Table */}
      <div className="space-y-2 pt-4">
        <Skeleton className="h-5 w-[140px]" />
        <div className="border rounded-xl p-4 space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
          <Skeleton className="h-px w-full bg-gray-200" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-8 w-[120px] rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
}
