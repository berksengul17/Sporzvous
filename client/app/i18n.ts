import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import enDrawer from '@/locales/en/drawer.json';
import enHomeLayout from '@/locales/en/home/homeLayout.json'
import enComplaint from '@/locales/en/complaint.json';
import enSettingsLayout from '@/locales/en/settings/settingsLayout.json'
import enProfileLayout from '@/locales/en/profile/profileLayout.json'
import enProfile from '@/locales/en/profile/profile.json'
import enFriendLayout from '@/locales/en/friend/friendLayout.json'
import enSportsScreen from '@/locales/en/home/sportsScreen.json';
import enFriends from '@/locales/en/friend/friends.json'
import enSettings from '@/locales/en//settings/settings.json';
import enFaq from '@/locales/en/settings/faq.json'
import enJoinEvent from '@/locales/en/home/joinEvent.json'
import enHomeScreen from '@/locales/en/home/homeScreen.json'
import enCreateEvent from '@/locales/en/home/createEvent.json'
import enMyeventsLayout from '@/locales/en/myevents/myeventsLayout.json'

import trDrawer from '@/locales/tr/drawer.json';
import trHomeLayout from '@/locales/tr/home/homeLayout.json'
import trComplaint from '@/locales/tr/complaint.json';
import trSettingsLayout from '@/locales/tr/settings/settingsLayout.json'
import trSportsScreen from '@/locales/tr/home/sportsScreen.json';
import trFriendLayout from '@/locales/tr/friend/friendLayout.json'
import trProfileLayout from '@/locales/tr/profile/profileLayout.json'
import trProfile from '@/locales/tr/profile/profile.json'
import trFriends from '@/locales/tr/friend/friends.json'
import trSettings from '@/locales/tr/settings/settings.json';
import trFaq from '@/locales/tr/settings/faq.json'
import trJoinEvent from '@/locales/tr/home/joinEvent.json'
import trHomeScreen from '@/locales/tr/home/homeScreen.json'
import trCreateEvent from '@/locales/tr/home/createEvent.json'
import trMyeventsLayout from '@/locales/tr/myevents/myeventsLayout.json'

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
        settingsLayout: enSettingsLayout,
        faq: enFaq,
        profile: enProfile,
        profileLayout: enProfileLayout,
        homeLayout: enHomeLayout,
        friendLayout: enFriendLayout,
        friends: enFriends,
        joinEvent: enJoinEvent,
        homeScreen: enHomeScreen,
        createEvent: enCreateEvent,
        myeventsLayout: enMyeventsLayout
      },
      tr: {
        drawer: trDrawer,
        complaint: trComplaint,
        sportsScreen: trSportsScreen,
        settings: trSettings,
        settingsLayout: trSettingsLayout,
        faq: trFaq,
        profile: trProfile,
        profileLayout: trProfileLayout,
        homeLayout: trHomeLayout,
        friendLayout: trFriendLayout,
        friends: trFriends,
        joinEvent: trJoinEvent,
        homeScreen: trHomeScreen,
        createEvent: trCreateEvent,
        myeventsLayout: trMyeventsLayout 
      },
    },
    lng: I18nManager.isRTL ? 'tr' : 'en',
    fallbackLng: 'en',
    ns: ['drawer', 'settings', 'sportsScreen', 'faq', 'complaint', 'profile', 'profileLayout', 'homeLayout', 'settingsLayout', 'friendLayout', 'friends', 'joinEvent', 'homeScreen',
      'createEvent', 'myeventsLayout'
     ],
    defaultNS: 'drawer',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
