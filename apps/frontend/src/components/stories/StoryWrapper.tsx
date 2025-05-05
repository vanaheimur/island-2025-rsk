'use client';

import React, { PropsWithChildren } from 'react';

// This wrapper helps with client-side component rendering in Storybook
// and ensures consistent font styling
const StoryWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="font-sans">
      {children}
    </div>
  );
};

export default StoryWrapper;
