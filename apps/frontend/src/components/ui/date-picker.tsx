"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerProps {
  /** The currently selected date */
  date?: Date
  /** Callback for when the date changes */
  onDateChange?: (date?: Date) => void
  /** Whether the date picker is disabled */
  disabled?: boolean
  /** Custom CSS class name */
  className?: string
  /** Placeholder text when no date is selected */
  placeholder?: string
}

/**
 * DatePicker component
 * 
 * A date picker component built using the Popover and Calendar components.
 * Allows users to select a date from a calendar popup.
 */
export function DatePicker({
  date,
  onDateChange,
  disabled = false,
  className,
  placeholder = "Pick a date",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/**
 * DateRangePicker component
 * 
 * A date range picker that allows selection of a start and end date.
 */
export interface DateRangePickerProps {
  /** The currently selected date range */
  dateRange?: DateRange
  /** Callback for when the date range changes */
  onDateRangeChange?: (dateRange?: DateRange) => void
  /** Whether the date range picker is disabled */
  disabled?: boolean
  /** Custom CSS class name */
  className?: string
  /** Placeholder text when no date range is selected */
  placeholder?: string
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled = false,
  className,
  placeholder = "Select a date range",
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onDateRangeChange}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

/**
 * MonthPicker component
 * 
 * A specialized date picker that allows users to select a month and year without a specific day.
 */
export interface MonthPickerProps {
  /** The currently selected date - day will be ignored */
  date?: Date
  /** Callback for when the month/year changes */
  onDateChange?: (date?: Date) => void
  /** Whether the month picker is disabled */
  disabled?: boolean
  /** Custom CSS class name */
  className?: string
  /** Placeholder text when no date is selected */
  placeholder?: string
}

export function MonthPicker({
  date,
  onDateChange,
  disabled = false,
  className,
  placeholder = "Select a month",
}: MonthPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMMM yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          captionLayout="dropdown-buttons"
          fromYear={1900}
          toYear={2100}
        />
      </PopoverContent>
    </Popover>
  )
}