import { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import StoryWrapper from './StoryWrapper'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <div className="w-full max-w-[800px]">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Table>

// Sample data for our tables
const invoices = [
  {
    id: 'INV-001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
    date: 'May 1, 2025',
  },
  {
    id: 'INV-002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    date: 'May 2, 2025',
  },
  {
    id: 'INV-003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
    date: 'May 3, 2025',
  },
  {
    id: 'INV-004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
    date: 'May 4, 2025',
  },
  {
    id: 'INV-005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
    date: 'May 5, 2025',
  },
]

// Basic table
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Table with footer
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

// Table with selectable rows
export const SelectableRows: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Table with actions
export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>
              <span
                className={`inline-flex h-6 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  invoice.paymentStatus === 'Paid'
                    ? 'bg-green-100 text-green-800'
                    : invoice.paymentStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {invoice.paymentStatus}
              </span>
            </TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// Table with pagination
export const WithPagination: Story = {
  render: () => (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 3).map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  ),
}

// Styled table
export const StyledTable: Story = {
  render: () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={invoice.id}
              className={index % 2 === 0 ? 'bg-muted/30' : undefined}
            >
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

// Fixed header table
export const FixedHeader: Story = {
  render: () => (
    <div className="rounded-md border">
      <div className="max-h-[300px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(15)].map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">INV-{1000 + i}</TableCell>
                <TableCell>{i % 3 === 0 ? 'Paid' : i % 3 === 1 ? 'Pending' : 'Unpaid'}</TableCell>
                <TableCell>
                  {i % 3 === 0 ? 'Credit Card' : i % 3 === 1 ? 'PayPal' : 'Bank Transfer'}
                </TableCell>
                <TableCell className="text-right">${(200 + i * 50).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}

// Table with sorting indication
export const SortableColumns: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center space-x-1">
            <span>Invoice</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="flex items-center space-x-1">
            <span>Date</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m7 15 5 5 5-5" />
            </svg>
          </TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...invoices].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
