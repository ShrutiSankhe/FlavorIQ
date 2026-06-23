import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlavorIQ — Understand flavor. Cook confidently.',
  description: 'AI-powered flavor intelligence. Explore any ingredient and discover perfect pairings.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
