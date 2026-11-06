import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div className='min-h-screen bg-white font-sans text-ink antialiased'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}

export default preview
