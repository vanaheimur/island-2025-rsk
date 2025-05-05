'use client';

import { useState } from 'react';
import { z } from 'zod';
import { FormBuilder, FormSchemaConfig } from '@/components/form-builder';
import { toast } from 'sonner';

export default function FormBuilderDemo() {
  const [formValues, setFormValues] = useState<any>(null);
  const [currentExample, setCurrentExample] = useState<'basic' | 'conditional' | 'multistep'>('basic');

  // Handle form submission
  const handleSubmit = (values: any) => {
    setFormValues(values);
    toast.success('Form submitted successfully!');
  };

  // Basic form schema example
  const basicFormSchema: FormSchemaConfig = {
    id: 'basic-form',
    title: 'Basic Information',
    description: 'Please fill out your personal information.',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        validation: z.string().min(2, 'Name must be at least 2 characters'),
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email address',
        required: true,
        validation: z.string().email('Please enter a valid email address'),
      },
      {
        type: 'layout',
        component: 'row',
        fields: [
          {
            id: 'age',
            type: 'number',
            label: 'Age',
            placeholder: 'Enter your age',
            min: 18,
            max: 100,
            required: true,
          },
          {
            id: 'gender',
            type: 'select',
            label: 'Gender',
            placeholder: 'Select your gender',
            options: [
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Non-binary', value: 'non-binary' },
              { label: 'Prefer not to say', value: 'not-specified' },
            ],
            required: true,
          },
        ],
      },
      {
        id: 'bio',
        type: 'textarea',
        label: 'Bio',
        placeholder: 'Tell us about yourself',
        rows: 4,
      },
      {
        id: 'terms',
        type: 'checkbox',
        checkboxLabel: 'I agree to the terms and conditions',
        required: true,
        validation: z.boolean().refine(val => val === true, {
          message: 'You must agree to the terms and conditions',
        }),
      },
    ],
  };

  // Conditional form schema example
  const conditionalFormSchema: FormSchemaConfig = {
    id: 'conditional-form',
    title: 'Conditional Form',
    description: 'This form demonstrates conditional rendering based on form values.',
    fields: [
      {
        id: 'employmentStatus',
        type: 'radio',
        label: 'Employment Status',
        options: [
          { label: 'Employed', value: 'employed' },
          { label: 'Self-employed', value: 'self-employed' },
          { label: 'Unemployed', value: 'unemployed' },
          { label: 'Student', value: 'student' },
        ],
        required: true,
      },
      // Conditional fields for employed people
      {
        id: 'companyName',
        type: 'text',
        label: 'Company Name',
        placeholder: 'Enter your company name',
        required: true,
        hidden: (values) => values.employmentStatus !== 'employed',
      },
      {
        id: 'jobTitle',
        type: 'text',
        label: 'Job Title',
        placeholder: 'Enter your job title',
        required: true,
        hidden: (values) => values.employmentStatus !== 'employed',
      },
      // Conditional fields for self-employed people
      {
        id: 'businessName',
        type: 'text',
        label: 'Business Name',
        placeholder: 'Enter your business name',
        required: true,
        hidden: (values) => values.employmentStatus !== 'self-employed',
      },
      {
        id: 'businessType',
        type: 'select',
        label: 'Business Type',
        options: [
          { label: 'Sole Proprietorship', value: 'sole-proprietorship' },
          { label: 'Partnership', value: 'partnership' },
          { label: 'LLC', value: 'llc' },
          { label: 'Corporation', value: 'corporation' },
          { label: 'Other', value: 'other' },
        ],
        required: true,
        hidden: (values) => values.employmentStatus !== 'self-employed',
      },
      // Conditional fields for students
      {
        id: 'schoolName',
        type: 'text',
        label: 'School Name',
        placeholder: 'Enter your school name',
        required: true,
        hidden: (values) => values.employmentStatus !== 'student',
      },
      {
        id: 'fieldOfStudy',
        type: 'text',
        label: 'Field of Study',
        placeholder: 'Enter your field of study',
        required: true,
        hidden: (values) => values.employmentStatus !== 'student',
      },
      // Conditional section for unemployed people
      {
        type: 'layout',
        component: 'card',
        title: 'Job Search Information',
        description: 'Please provide information about your job search.',
        fields: [
          {
            id: 'lookingForWork',
            type: 'checkbox',
            checkboxLabel: 'I am actively looking for work',
            defaultValue: true,
          },
          {
            id: 'desiredJobTitle',
            type: 'text',
            label: 'Desired Job Title',
            placeholder: 'Enter your desired job title',
          },
        ],
        condition: (values) => values.employmentStatus === 'unemployed',
      },
      {
        id: 'dateOfBirth',
        type: 'date',
        label: 'Date of Birth',
        required: true,
      },
    ],
  };

  // Multi-step form schema example
  const multiStepFormSchema: FormSchemaConfig = {
    id: 'multistep-form',
    title: 'Multi-step Registration',
    description: 'Complete this multi-step registration process.',
    steps: [
      {
        id: 'personal-info',
        title: 'Personal Information',
        description: 'Please provide your personal details.',
        fields: [
          {
            id: 'firstName',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter your first name',
            required: true,
          },
          {
            id: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true,
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email address',
            required: true,
            validation: z.string().email('Please enter a valid email address'),
          },
          {
            id: 'phone',
            type: 'tel',
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
          },
        ],
      },
      {
        id: 'address-info',
        title: 'Address Information',
        description: 'Please provide your address details.',
        fields: [
          {
            id: 'streetAddress',
            type: 'text',
            label: 'Street Address',
            placeholder: 'Enter your street address',
            required: true,
          },
          {
            type: 'layout',
            component: 'row',
            fields: [
              {
                id: 'city',
                type: 'text',
                label: 'City',
                placeholder: 'Enter your city',
                required: true,
              },
              {
                id: 'state',
                type: 'text',
                label: 'State/Province',
                placeholder: 'Enter your state/province',
                required: true,
              },
              {
                id: 'zipCode',
                type: 'text',
                label: 'ZIP/Postal Code',
                placeholder: 'Enter your ZIP/postal code',
                required: true,
              },
            ],
          },
          {
            id: 'country',
            type: 'select',
            label: 'Country',
            placeholder: 'Select your country',
            options: [
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
              { label: 'United Kingdom', value: 'uk' },
              { label: 'Australia', value: 'au' },
              { label: 'Germany', value: 'de' },
              { label: 'France', value: 'fr' },
              { label: 'Japan', value: 'jp' },
            ],
            required: true,
          },
        ],
      },
      {
        id: 'account-info',
        title: 'Account Information',
        description: 'Create your account credentials.',
        fields: [
          {
            id: 'username',
            type: 'text',
            label: 'Username',
            placeholder: 'Choose a username',
            required: true,
            validation: z.string().min(4, 'Username must be at least 4 characters'),
          },
          {
            id: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Choose a password',
            required: true,
            validation: z.string().min(8, 'Password must be at least 8 characters'),
          },
          {
            id: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Confirm your password',
            required: true,
          },
          {
            id: 'receiveUpdates',
            type: 'checkbox',
            checkboxLabel: 'I would like to receive updates via email',
            defaultValue: true,
          },
          {
            id: 'termsAgreed',
            type: 'checkbox',
            checkboxLabel: 'I agree to the terms and conditions',
            required: true,
            validation: z.boolean().refine(val => val === true, {
              message: 'You must agree to the terms and conditions',
            }),
          },
        ],
      },
    ],
    validationSchema: z.object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
      email: z.string().email('Please enter a valid email address'),
      phone: z.string().optional(),
      streetAddress: z.string().min(5, 'Please enter a valid street address'),
      city: z.string().min(2, 'Please enter a valid city'),
      state: z.string().min(2, 'Please enter a valid state/province'),
      zipCode: z.string().min(5, 'Please enter a valid ZIP/postal code'),
      country: z.string(),
      username: z.string().min(4, 'Username must be at least 4 characters'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string().min(8, 'Please confirm your password'),
      receiveUpdates: z.boolean(),
      termsAgreed: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
  };

  // Select the current form schema based on the current example
  const getCurrentSchema = () => {
    switch (currentExample) {
      case 'conditional':
        return conditionalFormSchema;
      case 'multistep':
        return multiStepFormSchema;
      default:
        return basicFormSchema;
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Form Builder Demo</h1>
      
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${currentExample === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentExample('basic')}
          >
            Basic Form
          </button>
          <button
            className={`px-4 py-2 rounded-md ${currentExample === 'conditional' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentExample('conditional')}
          >
            Conditional Form
          </button>
          <button
            className={`px-4 py-2 rounded-md ${currentExample === 'multistep' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentExample('multistep')}
          >
            Multi-step Form
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <FormBuilder
            schema={getCurrentSchema()}
            onSubmit={handleSubmit}
            submitLabel="Submit Form"
            className="space-y-6"
          />
        </div>
      </div>

      {formValues && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Form Submission Result:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(formValues, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
