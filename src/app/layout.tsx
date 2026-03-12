import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nexpura Website Builder',
  description: 'Build your jewellery storefront with Nexpura',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
