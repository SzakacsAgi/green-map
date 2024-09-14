import { Link } from 'react-router-dom'
import RegistrationForm from '../registration/RegistrationForm'
import { useTranslation } from 'react-i18next'

const Registration = () => {
  const { t } = useTranslation()

  return (
    <section className="flex items-center justify-center min-h-screen w-full font-secondaryFont relative bg-primaryDarkGray xl:justify-start lg:overflow-hidden py-5">
      <img src="/assets/wave.svg" alt="Image about a green wave" className="absolute bottom-0 xl:hidden" />
      <img src="/assets/wave-registration.svg" alt="Image about a green wave" className="hidden absolute right-0 h-full xl:inline" />
      <div className="sm:container w-full flex flex-col justify-center h-auto sm:max-w-full px-12 xl:pl-28 xl:w-11/12 relative z-10 lg:max-w-[90%] xl:max-w-[70%] 2xl:max-w-[1150px] after:h-24 lg:after:h-48 after:sm:h-32 before:sm:h-14 before:h-8 xl:after:h-0 xl:before:h-0">
        <img src="/assets/logo.png" alt="Picture from a green map icon" className="w-24 md:w-[105px] 2xl:w-[122px]" />
        <h2 className="font-bold text-2xl my-8 2xl:my-9 self-start text-white md:text-3xl xl:text-4xl 2xl:text-[40px]">{t('registration.registrationText')}</h2>
        <RegistrationForm />
        <div className="flex justify-center text-lg md:text-xl font-bold mt-6 w-full text-white flex-wrap sm:justify-start">
          <p className="text-base sm:text-lg md:text-xl">{t('registration.navigateToLogin')}</p>
          <Link to="/login" className="text-base sm:text-lg md:text-xl text-primaryGreen underline ml-2 underline-offset-4 hover:text-primaryButtonHover">
            {t('login.loginAction')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Registration
