import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Subject Ranks',
  description: 'Rank the subjects',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <div className="h-screen w-screen flex flex-col bg-pink-00 justify-between items-center">
          {children}
        </div>
      </body>
    </html>
  )
}
