import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import enDrawer from '@/locales/en/drawer.json';
import enComplaint from '@/locales/en/complaint.json';

import enSportsScreen from '@/locales/en/home/sportsScreen.json';

import enSettings from '@/locales/en//settings/settings.json';
import enFaq from '@/locales/en/settings/faq.json'


import trDrawer from '@/locales/tr/drawer.json';
import trComplaint from '@/locales/tr/complaint.json';

import trSportsScreen from '@/locales/tr/home/sportsScreen.json';

import trSettings from '@/locales/tr/settings/settings.json';
import trFaq from '@/locales/tr/settings/faq.json'

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        drawer: enDrawer,
        complaint: enComplaint,
        sportsScreen: enSportsScreen,
        settings: enSettings,
        faq: enFaq
      },
      tr: {
        drawer: trDrawer,
        complaint: trComplaint,
        sportsScreen: trSportsScreen,
        settings: trSettings,
        faq: trFaq
      },
    },
    lng: I18nManager.isRTL ? 'tr' : 'en',
    fallbackLng: 'en',
    ns: ['drawer', 'settings', 'sportsScreen', 'faq', 'complaint'],
    defaultNS: 'drawer',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
