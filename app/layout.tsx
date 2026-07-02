import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlavorIQ — Most cooks guess. You won\'t have to.',
  description: 'AI-powered flavor intelligence. Enter any ingredient and get its full flavor profile, origin, and exactly what pairs with it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
