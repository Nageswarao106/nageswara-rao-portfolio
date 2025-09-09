
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Nageswara Rao Innamuri - Senior Java Developer',
  description: 'Senior Java Developer with 7+ years of experience in Transportation, Healthcare, and Supply Chain domains. Expertise in Spring Boot, Microservices, AWS, and Angular.',
  keywords: [
    'Java Developer',
    'Spring Boot',
    'Microservices',
    'AWS',
    'Transportation Software',
    'Healthcare Management',
    'Supply Chain',
    'Full Stack Developer',
    'Enterprise Applications'
  ],
  authors: [{ name: 'Nageswara Rao Innamuri' }],
  creator: 'Nageswara Rao Innamuri',
  metadataBase: new URL('https://nageswarao-portfolio.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nageswarao-portfolio.vercel.app',
    title: 'Nageswara Rao Innamuri - Senior Java Developer',
    description: 'Senior Java Developer specializing in enterprise solutions across Transportation, Healthcare, and Supply Chain domains.',
    siteName: 'Nageswara Rao Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nageswara Rao Innamuri - Senior Java Developer',
    description: 'Senior Java Developer specializing in enterprise solutions across Transportation, Healthcare, and Supply Chain domains.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
