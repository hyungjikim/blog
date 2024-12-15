import NextBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';
import stylexPlugin from '@stylexswc/nextjs-plugin';
import path from 'path';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const rootDir = __dirname;

const withStylex = stylexPlugin({
  rsOptions: {
    aliases: {
      '@/*': [path.join(rootDir, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir,
    },
  },
});

const nextConfig = {};

export default withBundleAnalyzer(withNextIntl(withStylex(nextConfig)));
