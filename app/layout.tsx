import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://carolinagolfhomes.com'),
  title: 'Carolina Golf Homes',
  description:
    'Find your dream home on the green. Only golf course properties in North and South Carolina.',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
