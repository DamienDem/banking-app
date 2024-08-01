import {Pathnames, LocalePrefix} from 'next-intl/routing';

export type Locale = (typeof locales)[number];

export const locales = ['fr', 'en'] as const;
export const defaultLocale: Locale = 'fr';



export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/myBanks': {
    en: '/my-banks',
    fr: '/mes-banques'
  },
  '/transactionHistory': {
    en: '/transaction-history',
    fr: '/historique-des-transactions'
  },
  '/transferFunds': {
    en: '/transfer-funds',
    fr: "/transferer-de-largent"
  }
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';
