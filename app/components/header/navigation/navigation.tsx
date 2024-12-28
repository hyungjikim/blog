import stylex from '@stylexjs/stylex';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Navigation = () => {
  const t = useTranslations();
  return (
    <nav {...stylex.props(style.nav)}>
      <ul {...stylex.props(style.ul)}>
        <li {...stylex.props(style.commonLi, style.leftLi)}>{t('형지')}</li>

        <li {...stylex.props(style.commonLi)}>{t('블로그')}</li>
        <li {...stylex.props(style.commonLi)}>{t('소개')}</li>
        <li {...stylex.props(style.commonLi)}>
          <Link href="/login">{t('로그인')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

const style = stylex.create({
  nav: {
    height: '60px',
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
    color: '#1a1a1a',
    justifyContent: 'space-between',
  },
  commonLi: {
    padding: '16px',
    fontWeight: 700,
  },
  leftLi: {
    marginRight: 'auto',
  },
});
