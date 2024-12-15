import stylex from '@stylexjs/stylex';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <h1 {...stylex.props(style.h1)}>locale : {locale}</h1>;
}

const style = stylex.create({
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
  },
});
