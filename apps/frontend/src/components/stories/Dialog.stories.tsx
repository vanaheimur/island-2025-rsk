import { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import StoryWrapper from './StoryWrapper';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoryWrapper>
        <div className="flex flex-col gap-4">
          <Story />
        </div>
      </StoryWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Basic Dialog</DialogTitle>
          <DialogDescription>
            This is a basic dialog example with a simple header and description.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This is the content area of the dialog.</p>
        </div>
        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@johndoe" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="button" variant="destructive">
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Terms of Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read these terms carefully before using our service.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-md font-medium mb-2">1. Introduction</h3>
          <p className="text-sm mb-4">
            Welcome to our service. By using our service, you agree to these terms of service in full.
            If you disagree with these terms of service or any part of them, you must not use our service.
          </p>
          
          <h3 className="text-md font-medium mb-2">2. Usage License</h3>
          <p className="text-sm mb-4">
            We grant you a limited, non-exclusive, non-transferable license to use our service for your
            personal or internal business purposes.
          </p>
          
          <h3 className="text-md font-medium mb-2">3. User Accounts</h3>
          <p className="text-sm mb-4">
            You must ensure that your account information is accurate, complete, and up-to-date. You are
            responsible for safeguarding the password used to access our service.
          </p>
          
          <h3 className="text-md font-medium mb-2">4. Content</h3>
          <p className="text-sm mb-4">
            Our service allows you to post, link, store, share and otherwise make available certain information,
            text, graphics, videos, or other material. You are responsible for the content that you post.
          </p>
          
          <h3 className="text-md font-medium mb-2">5. Prohibited Uses</h3>
          <p className="text-sm mb-4">
            You may use our service only for lawful purposes and in accordance with these terms of service.
            You agree not to access or use our service for any illegal or unauthorized purpose.
          </p>
          
          <h3 className="text-md font-medium mb-2">6. Termination</h3>
          <p className="text-sm mb-4">
            We may terminate or suspend your account and bar access to our service immediately, without prior
            notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
          </p>
        </div>
        <DialogFooter>
          <Button type="button">I Agree</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Explore the features and specifications of this product.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="bg-muted h-[200px] rounded-md flex items-center justify-center">
            <span className="text-muted-foreground">Product Image Placeholder</span>
          </div>
          <h3 className="text-lg font-medium">Premium Ergonomic Chair</h3>
          <p className="text-sm text-muted-foreground">
            Designed for comfort and productivity, this ergonomic chair features adjustable height,
            lumbar support, and premium materials for long-lasting durability.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="font-medium">Material</span>
              <span className="text-muted-foreground">Premium Mesh</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Dimensions</span>
              <span className="text-muted-foreground">28" x 25" x 42"</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Weight</span>
              <span className="text-muted-foreground">35 lbs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Warranty</span>
              <span className="text-muted-foreground">5 Years</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Close</Button>
          <Button>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NestedDialogs: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open First Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>First Dialog</DialogTitle>
          <DialogDescription>
            This is the first dialog. You can open another dialog from here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">Click the button below to open a nested dialog.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Nested Dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[375px]">
              <DialogHeader>
                <DialogTitle>Nested Dialog</DialogTitle>
                <DialogDescription>
                  This is a nested dialog inside the first dialog.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>You can stack dialogs on top of each other if needed.</p>
              </div>
              <DialogFooter>
                <Button type="button">Close Nested Dialog</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <Button type="button">Close First Dialog</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const AlertVariant: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Show Alert</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Success!</DialogTitle>
        </DialogHeader>
        <div className="py-6 flex justify-center">
          <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="text-center pb-4">
          <p>Your changes have been saved successfully.</p>
        </div>
        <DialogFooter className="justify-center">
          <Button type="button">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
