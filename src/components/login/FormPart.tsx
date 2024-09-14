import { useTranslation } from 'react-i18next'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

const FormPart = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center bg-primaryDarkGray min-h-screen px-12 xl:pl-24 w-full xl:w-[52%]">
      <div className="w-full sm:max-w-md 2xl:max-w-lg flex flex-col lg:flex-col z-10 after:h-24 md:after:h-36 sm:after:h-32 lg:after:h-44 before:w-10 before:sm:h-9 before:h-5 xl:after:h-0 xl:before:h-0">
        <div className="flex items-center self-start">
          <img src="/assets/logo.png" alt="Picture from a green map icon" className="w-24 md:w-[105px] 2xl:w-[125px]" />
        </div>
        <h2 className="font-bold text-2xl my-8 xl:my-10 self-start font-primaryFont text-white md:text-3xl xl:text-4xl 2xl:text-[40px]">
          {t('login.welcomeText')}
        </h2>
        <LoginForm />
        <div className="flex justify-center text-base md:text-lg font-bold mt-10 w-full text-white flex-wrap">
          <p className="text-base sm:text-lg md:text-xl">{t('login.navigateToRegistration')}</p>
          <Link
            to="/registration"
            className="font-bold text-base sm:text-lg md:text-xl text-primaryGreen underline ml-2 underline-offset-4 hover:text-primaryButtonHover"
          >
            {t('registration.registrationAction')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FormPart
