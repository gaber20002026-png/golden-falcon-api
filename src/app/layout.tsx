import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Golden Falcon AI v5.0',
  description: 'AI Trading System for Gold',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
