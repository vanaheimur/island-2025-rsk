import '../src/app/globals.css';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import type { Preview } from '@storybook/react';
import React from 'react';

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

// Global decorator to apply fonts and styling
const withTheme = (StoryFn) => (
  <div className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}>
    <StoryFn />
  </div>
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [withTheme],
};

export default preview;
