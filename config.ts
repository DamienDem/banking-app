import {Pathnames, LocalePrefix} from 'next-intl/routing';

export type Locale = (typeof locales)[number];

export const locales = ['fr', 'en'] as const;
export const defaultLocale: Locale = 'fr';



export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    fr: '/chemins'
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

// export const port = process.env.PORT || 3000;
// export const host = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : `http://localhost:${port}`;