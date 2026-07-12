import type { Metadata } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import './bold-storefront.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap'
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://itslonger.com'),
  title: 'Longer — Electrolyte Dysfunction',
  description: 'A serious electrolyte powder for moments when performance matters.',
  openGraph: {
    title: 'Longer — Electrolyte Dysfunction',
    description: 'A serious electrolyte powder for moments when performance matters.',
    type: 'website',
    url: '/',
    siteName: 'Longer',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Longer — Electrolyte Dysfunction'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Longer — Electrolyte Dysfunction',
    description: 'A serious electrolyte powder for moments when performance matters.',
    images: ['/opengraph-image']
  }
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
