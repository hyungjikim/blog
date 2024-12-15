import { routing } from '@/i18n/routing';
import { socialLogin, login, signup } from './actions';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const googleLogin = socialLogin.bind(null, 'google');
  const githubLogin = socialLogin.bind(null, 'github');
  return (
    <>
      <form>
        <label htmlFor="email">{t('이메일')}</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">{t('비밀번호')}</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>{t('로그인')}</button>
        <button formAction={signup}>{t('회원가입')}</button>
      </form>
      <button onClick={googleLogin}>{t('구글로 시작하기')}</button>
      <button onClick={githubLogin}>{t('깃허브로 시작하기')}</button>
    </>
  );
}
