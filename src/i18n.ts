import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from './locales/en.json'
import huJSON from './locales/hu.json'

const selectedLanguage = localStorage.getItem('recoil-persist') ? JSON.parse(localStorage.getItem('recoil-persist')!).selectedLanguage : ''

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    hu: { ...huJSON }
  },
  lng: selectedLanguage ? selectedLanguage : navigator.language,
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
