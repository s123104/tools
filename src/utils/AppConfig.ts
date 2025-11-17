import type { LocalizationResource } from '@clerk/types';
import type { LocalePrefixMode } from 'next-intl/routing';
import { enUS, frFR, zhTW } from '@clerk/localizations';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['en', 'zh-tw', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  'zh-tw': zhTW,
  fr: frFR,
};

export const ClerkLocalizations = {
  defaultLocale: enUS,
  supportedLocales,
};
