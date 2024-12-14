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
  verification: {
    google: 'tG7FHMfv6ogz5e838LeM6QwEBZtiVFHQXaM1WoVnUqw',
    other: {
      'naver-site-verification': '797fbeef5a234d483e780f6de9ed393c4cb80d5e',
    },
  },
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
