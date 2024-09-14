import { useRecoilState } from 'recoil'
import { themeState } from '../../utils/atoms'
import { useCallback } from 'react'
import { SunIcon } from '@heroicons/react/24/outline'
import { MoonIcon } from '@heroicons/react/24/outline'
import { SupportedThemes, SupportedLanguages } from '../../interfaces'
import { useTranslation } from 'react-i18next'

const ThemeSwitch = () => {
  const [theme, setTheme] = useRecoilState(themeState)
  const { t, i18n } = useTranslation()

  const handleClick = useCallback(() => {
    theme === SupportedThemes.LIGHT ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    setTheme(theme === SupportedThemes.LIGHT ? 'dark' : SupportedThemes.LIGHT)
  }, [theme])

  return (
    <div>
      <label className="inline-flex items-center cursor-pointer w-36">
        <input type="checkbox" checked={theme === SupportedThemes.LIGHT} className="sr-only" onClick={handleClick} readOnly />
        <div
          className={`relative flex items-center px-6 py-1.5 rounded-full transition-all duration-500 md:px-9 md:py-2.5 ${
            theme === SupportedThemes.LIGHT ? 'bg-themeLightBg' : 'bg-primaryDarkGray'
          }`}
        >
          <div
            className={`absolute w-9 h-9 bg-white rounded-full p-0.5 transition-transform duration-500 md:w-11 md:h-11 ${
              theme === SupportedThemes.LIGHT ? 'transform -translate-x-full ml-3.5 md:ml-2.5' : 'right-10 md:right-12 transform translate-x-full'
            }`}
          >
            {theme === SupportedThemes.LIGHT ? (
              <SunIcon className="w-full h-full text-bg-themeLightBg" />
            ) : (
              <MoonIcon className="w-full h-full text-primaryDarkGray" />
            )}
          </div>
          <p
            className={`first-letter:uppercase font-secondaryFont text-white text-xl ml-auto transition-all duration-500 ${theme === SupportedThemes.LIGHT ? 'pl-5' : 'pr-6'}`}
          >
            {i18n.language === SupportedLanguages.ENGLISH ? theme : theme === SupportedThemes.LIGHT ? `${t('themes.light')}` : `${t('themes.dark')}`}
          </p>
        </div>
      </label>
    </div>
  )
}

export default ThemeSwitch
