import './globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Providers } from '@/components/providers'

export const metadata = {
  title: 'Toki Pona Words',
  description: 'Learn Toki Pona words!',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '0 0% 100%' },
    { media: '(prefers-color-scheme: dark)', color: '222.2 84% 4.9%' }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans',
          'antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  )
}
