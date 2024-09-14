import { useRecoilValue } from 'recoil'
import BaseLayout from '../common/BaseLayout'
import { LanguageSelector } from '../Profile/LanguageSwitch'
import ThemeSwitch from '../Profile/ThemeSwitch'
import { authState } from '../../utils/atoms'
import Label from '../common/Label'
import { useTranslation } from 'react-i18next'
import { SupportedLanguages } from '../../interfaces'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useLogout } from '../../hooks/useLogout'

const Profile = () => {
  const { email } = useRecoilValue(authState)
  const { t } = useTranslation()
  const logout = useLogout()

  return (
    <BaseLayout title={t('menuPoints.desktop.profile')}>
      <section className={`px-10 pt-1 pb-8 flex flex-col gap-10 h-full md:pt-5`}>
        <div className="sm:flex items-center flex-wrap relative">
          <div className="rounded-full h-36 w-36 border-2 my-7 p-10 md:w-40 md:h-40 md:text-[70px] 2xl:h-44 2xl:w-44 bg-middleGray border-primaryDarkGray text-black font-bold text-6xl text-center flex items-center justify-center sm:mr-12 dark:text-white dark:border-white dark:bg-darkTopBar">
            {email.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex">
              <div className="mr-14">
                <Label text={t('profile.name')} className="text-darkGray" />
                <p className="font-bold text-lg md:text-2xl dark:text-white">{email.slice(0, email.indexOf('@'))}</p>
              </div>
              {/* <div>
                <Label text={t('inputLabels.lastName')} className="text-darkGray" />
                <p className="font-bold text-lg md:text-2xl dark:text-white">Szakács</p>
              </div> */}
            </div>
            <div className="mt-6">
              <Label text={t('inputLabels.email')} className="text-darkGray" />
              <p className="font-bold text-lg md:text-2xl dark:text-white break-words">{email}</p>
            </div>
          </div>
          <div className="w-fit lg:hidden absolute top-6 right-0" onClick={logout}>
            <ArrowUpTrayIcon
              className="w-8 md:w-10 rotate-90 text-darkRed stroke-2 cursor-pointer hover:text-lightRed"
              title={t('menuPoints.desktop.logout')}
            />
          </div>
        </div>
        <section className="flex flex-col">
          <p className="text-primaryDarkGray mb-3 2xl:mb-5 font-bold text-2xl 2xl:text-3xl">{t('profile.settings')}</p>
          <div className="flex flex-wrap">
            <div className="min-w-60 mr-12 mb-5 md:mb-7">
              <div>
                <Label text={t('profile.language')} className="text-darkGray font-normal" />
              </div>
              <LanguageSelector
                supportedLanguages={[
                  { label: t('profile.eng'), imagePosition: 'left', image: '/assets/gb.svg', code: SupportedLanguages.ENGLISH },
                  { label: t('profile.hun'), imagePosition: 'left', image: '/assets/hu.svg', code: SupportedLanguages.HUNGARY }
                ]}
              />
            </div>
            <div className="mb-6">
              <Label text={t('profile.theme')} className="text-darkGray font-normal" />
              <ThemeSwitch />
            </div>
          </div>
        </section>
      </section>
    </BaseLayout>
  )
}

export default Profile
