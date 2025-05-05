'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

export default function ComponentsShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">UI Components Showcase</h1>

      {/* Buttons Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Input</h2>
        <div className="grid gap-4 max-w-sm">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
        </div>
      </section>

      {/* Checkbox Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Checkbox</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </section>

      {/* Radio Group Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Radio Group</h2>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </section>

      {/* Select Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Select</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </section>
    </div>
  )
}
