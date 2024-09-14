import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { t } from 'i18next'
import ForgotPasswordForm from '../forgotPassword/ForgotPasswordForm'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleLoginNavigation = () => {
    navigate('/login')
  }

  return (
    <section className="flex items-center justify-center min-h-screen w-full font-secondaryFont relative bg-primaryDarkGray xl:justify-start lg:overflow-hidden">
      <img src="/assets/wave.svg" alt="Image about a green wave" className="absolute bottom-0 xl:hidden" />
      <img src="/assets/wave-registration.svg" alt="Image about a green wave" className="hidden absolute right-0 h-full xl:inline " />

      <div className="w-full flex flex-col items-center justify-center h-auto px-12 xl:pl-28 xl:w-11/12 relative z-10 lg:max-w-[50%] xl:max-w-[50%] 2xl:max-w-[755px] after:h-28 lg:after:h-48 after:sm:h-32 after:md:h-40 before:sm:h-14 before:h-8 xl:after:h-0 xl:before:h-0">
        <div className="w-full sm:max-w-md 2xl:max-w-lg">
          <img src="/assets/logo.png" alt="Picture from a green map icon" className="w-24 md:w-[105px] 2xl:w-[122px]" />
          <h2 className="font-bold font-primaryFont text-2xl my-8 2xl:my-9 self-start text-white md:text-3xl xl:text-4xl 2xl:text-[40px]">
            {t('forgotPassword.requestEmailAddress')}
          </h2>
          <ForgotPasswordForm />
          <div
            className="text-base sm:text-lg md:text-xl text-white underline ml-2 underline-offset-4 flex items-center cursor-pointer mt-5 hover:text-primaryButtonHover w-fit"
            onClick={handleLoginNavigation}
          >
            <ArrowLeftIcon className="w-8 stroke-2 mr-2" />
            <p className="text-base sm:text-lg md:text-xl font-bold">{t('forgotPassword.returnToLogin')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
