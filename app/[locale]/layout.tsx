import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import '../globals.css';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className={`${notoSans.className}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
