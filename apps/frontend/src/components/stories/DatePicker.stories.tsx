import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DatePicker, DateRangePicker, MonthPicker } from '../ui/date-picker'
import { Label } from '../ui/label'
import StoryWrapper from './StoryWrapper'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <div className="flex flex-col gap-8">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function DefaultDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[240px]">
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    )
  },
}

export const WithLabel: Story = {
  render: function WithLabelDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[240px]">
        <Label htmlFor="dob">Date of Birth</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Select birth date"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: function DisabledDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[240px]">
        <Label htmlFor="dob">Date (Disabled)</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          disabled
          placeholder="Select date"
        />
      </div>
    )
  },
}

export const CustomWidth: Story = {
  render: function CustomWidthDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[320px]">
        <Label htmlFor="dob">Event Date</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          className="w-full"
          placeholder="Select event date"
        />
      </div>
    )
  },
}

export const DateRangeExample: Story = {
  render: function DateRangePickerExample() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    })
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[320px]">
        <Label>Date Range</Label>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          placeholder="Select date range"
        />
      </div>
    )
  },
}

export const MonthPickerExample: Story = {
  render: function MonthPickerExample() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[240px]">
        <Label>Month</Label>
        <MonthPicker
          date={date}
          onDateChange={setDate}
          placeholder="Select month"
        />
      </div>
    )
  },
}

export const NoDefaultDate: Story = {
  render: function NoDefaultDatePicker() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[240px]">
        <Label>Optional Date</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Select a date (optional)"
        />
      </div>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: function CustomPlaceholderDatePicker() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <div className="flex flex-col space-y-2 w-full max-w-[240px]">
        <Label>Appointment Date</Label>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Pick appointment date"
        />
      </div>
    )
  },
}

export const FormExample: Story = {
  render: function FormExampleDatePicker() {
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
    const [appointmentRange, setAppointmentRange] = useState<DateRange | undefined>(undefined)
    
    return (
      <div className="bg-card p-6 rounded-lg border w-full max-w-[400px] flex flex-col space-y-4">
        <h3 className="text-lg font-medium">Appointment Request</h3>
        
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <input 
            type="text" 
            id="name" 
            className="w-full h-9 rounded-md border px-3 py-1 bg-background"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label>Date of Birth</Label>
          <DatePicker
            date={birthDate}
            onDateChange={setBirthDate}
            placeholder="Select your birth date"
            className="w-full"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label>Preferred Appointment Dates</Label>
          <DateRangePicker
            dateRange={appointmentRange}
            onDateRangeChange={setAppointmentRange}
            placeholder="Select preferred dates"
            className="w-full"
          />
        </div>
        
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 mt-2">
          Submit Request
        </button>
      </div>
    )
  },
}
