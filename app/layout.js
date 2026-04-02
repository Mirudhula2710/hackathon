import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Haq AI - Know Your Rights',
  description: 'Free legal help for Indian workers and rural communities',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
