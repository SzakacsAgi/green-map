import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../utils/atoms'

const PageNotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useRecoilValue(themeState)

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <section className="flex items-center justify-center min-h-screen w-full font-secondaryFont relative bg-pageNotFoundBg xl:justify-start lg:overflow-hidden dark:bg-darkContentBg">
      <img src="/assets/wave.svg" alt="Image about a green wave" className="absolute bottom-0 xl:hidden" />
      <img src="/assets/wave-registration.svg" alt="Image about a green wave" className="hidden absolute right-0 h-full xl:inline " />
      <div className="container flex flex-col justify-center items-center gap-6 h-auto relative lg:max-w-[90%]">
        <section className="flex flex-col justify-center items-center gap-y-10 md:pb-10 lg:pb-14 xl:pb-10 after:w-10 after:h-16 before:h-16 before:w-10 xl:after:h-0 xl:before:h-0 min-h-screen">
          <img src={`/assets/404${theme}.svg`} alt="404 text with a mountain on the background" className="sm:w-[75%] xl:w-[90%]" />
          <div className="flex flex-col items-center justify-center gap-6" onClick={handleBackClick}>
            <h1 className="text-primaryGreen font-primaryFont font-bold text-center text-3xl md:text-4xl 2xl:text-5xl">{t('pageNotFound.notFound')}</h1>
            <div className="flex text-primaryDarkGray cursor-pointer hover:text-black">
              <ArrowLeftIcon className="mr-2 w-7 md:w-8 lg:w-9" />
              <h2 className="font-bold text-center text-xl md:text-2xl 2xl:text-3xl">{t('pageNotFound.backText')}</h2>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default PageNotFound
