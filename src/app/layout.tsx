import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import PwaInit from '@/components/PwaInit';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#06b6d4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://learn-folder-structure.vercel.app'),
  title: {
    default: 'PathPilot - Learn File Paths Through Interactive Game',
    template: '%s | PathPilot',
  },
  description:
    'Master file system navigation with PathPilot, an interactive puzzle game that teaches relative and absolute paths through visual tree exploration.',
  keywords: [
    'file system game',
    'learn relative path',
    'linux path practice',
    'file navigation game',
    'terminal path trainer',
    'command line practice',
    'directory navigation',
    'cd command practice',
    'file tree puzzle',
    'linux terminal game',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/icons/icon-192x192.png' }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PathPilot',
  },
  openGraph: {
    title: 'PathPilot - Learn File Paths Through Interactive Game',
    description:
      'Master file system navigation with PathPilot. Navigate visual folder trees using path commands in this interactive educational game.',
    type: 'website',
    locale: 'en_US',
    siteName: 'PathPilot',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PathPilot - Interactive File System Navigation Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PathPilot - Learn File Paths Through Interactive Game',
    description:
      'Master file system navigation with PathPilot. Navigate visual folder trees using path commands.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PwaInit />
        {children}

        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'PathPilot',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web',
              description:
                'An interactive puzzle game that teaches file system navigation using relative and absolute paths.',
              url: 'https://learn-folder-structure.vercel.app',
              author: { '@type': 'Person', name: 'Arun Neupane', email: 'arunneupane0000@gmail.com', telephone: '+9779811420975' },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
      </body>
    </html>
  );
}
