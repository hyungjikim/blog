import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const notoSans = Noto_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Hyungji Blog',
    template: '%s | Hyungji Blog',
  },
  description: 'Happily Dev After',
};

const jsonLd = {
  '@context': 'https://hyungjikim.vercel.app/',
  '@type': 'Person',
  name: 'Hyungji Kim',
  jobTitle: 'Frontend Developer',
  sameAs: ['https://github.com/hyungjikim'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`}>{children}</body>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </html>
  );
}
