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
import enFilterEvents from "@/locales/en/myevents/filterEvents.json"
import enMyeventsPage from "@/locales/en/myevents/myeventsPage.json"
import enMainEventScreen from '@/locales/en/myevents/mainEventScreen.json'
import enFriendList from '@/locales/en/friend/friendlist.json'
import enLogin from '@/locales/en/login/index.json'
import enForgotPw from '@/locales/en/login/forgotpw.json'
import enRegister from '@/locales/en/login/register.json'
import enInformation from '@/locales/en/login/information.json'
import enSetProfile1 from '@/locales/en/login/setProfile1.json'
import enSetProfile2 from '@/locales/en/login/setProfile2.json'
import enSetProfile3 from '@/locales/en/login/setProfile3.json'
import enSetProfile4 from '@/locales/en/login/setProfile4.json'
import enSetProfile5 from '@/locales/en/login/setProfile5.json'
import enCommentItem from '@/locales/en/profile/commentItem.json'

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
import trFilterEvents from "@/locales/tr/myevents/filterEvents.json"
import trMyeventsPage from "@/locales/tr/myevents/myeventsPage.json"
import trMainEventScreen from '@/locales/tr/myevents/mainEventScreen.json'
import trFriendList from '@/locales/tr/friend/friendlist.json'
import trLogin from '@/locales/tr/login/index.json'
import trForgotPw from '@/locales/tr/login/forgotpw.json'
import trRegister from '@/locales/tr/login/register.json'
import trInformation from '@/locales/tr/login/information.json'
import trSetProfile1 from '@/locales/tr/login/setProfile1.json'
import trSetProfile2 from '@/locales/tr/login/setProfile2.json'
import trSetProfile3 from '@/locales/tr/login/setProfile3.json'
import trSetProfile4 from '@/locales/tr/login/setProfile4.json'
import trSetProfile5 from '@/locales/tr/login/setProfile5.json'
import trCommentItem from '@/locales/tr/profile/commentItem.json'

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
        myeventsLayout: enMyeventsLayout,
        filterEvents: enFilterEvents,
        myeventsPage: enMyeventsPage,
        mainEventScreen: enMainEventScreen,
        friendList: enFriendList,
        login: enLogin,
        forgotPw: enForgotPw,
        register: enRegister,
        information: enInformation,
        setProfile1: enSetProfile1,
        setProfile2: enSetProfile2,
        setProfile3: enSetProfile3,
        setProfile4: enSetProfile4,
        setProfile5: enSetProfile5,
        commentItem: enCommentItem,

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
        myeventsLayout: trMyeventsLayout,
        filterEvents: trFilterEvents,
        myeventsPage: trMyeventsPage,
        mainEventScreen: trMainEventScreen,
        friendList: trFriendList,
        login: trLogin,
        forgotPw: trForgotPw,
        register: trRegister,
        information: trInformation,
        setProfile1: trSetProfile1,
        setProfile2: trSetProfile2,
        setProfile3: trSetProfile3,
        setProfile4: trSetProfile4,
        setProfile5: trSetProfile5,
        commentItem: trCommentItem,

      },
    },
    lng: I18nManager.isRTL ? 'tr' : 'en',
    fallbackLng: 'en',
    ns: ['drawer', 'settings', 'sportsScreen', 'faq', 'complaint', 'profile', 'profileLayout', 'homeLayout', 'settingsLayout', 'friendLayout', 'friends', 'joinEvent', 'homeScreen',
      'createEvent', 'myeventsLayout', 'filterEvents', 'myeventsPage', 'mainEventScreen', 'friendList', 'login' , 'forgotPw' , 'register', 'information' , 'setProfile1' , 'setProfile2' ,
      'setProfile3' , 'setProfile4' , 'setProfile5' , 'commentItem'
     ],
    defaultNS: 'drawer',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
