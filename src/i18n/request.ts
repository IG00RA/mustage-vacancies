import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Check if locale is valid (either "ua" or "ru"), otherwise use the default locale
  if (!locale || !routing.locales.includes(locale as 'uk' | 'ru')) {
    locale = routing.defaultLocale;
  }

  // Ensure that locale is now properly typed as "ua" | "ru"
  return {
    locale: locale as 'uk' | 'ru', // Type assertion to ensure proper type
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
