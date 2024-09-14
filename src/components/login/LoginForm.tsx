import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ArrowRightIcon } from '@heroicons/react/16/solid'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { authState, selectedLanguage, themeState } from '../../utils/atoms'
import { useSetRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { LoginFormInput, ResponseError, ResponsesType, SupportedInputs, SupportedThemes, SupportedUserActionFeedBackType } from '../../interfaces'
import FormInput from '../common/Input/FormInput'
import PasswordInput from '../common/Input/PasswordInput'
import PrimaryButton from '../common/Button/PrimaryButton'
import UserActionFeedback from '../common/Errors/UserActionFeedback'

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>()
  const { t } = useTranslation()
  const setAuth = useSetRecoilState(authState)
  const setTheme = useSetRecoilState(themeState)
  const setLanguage = useSetRecoilState(selectedLanguage)

  const [isUnderSubmit, setIsUnderSubmit] = useState(false)
  const [isPasswordSeen, setIsPasswordSeen] = useState(false)
  const [responseFeedback, setResponseFeedback] = useState<ResponsesType>()

  const handleLogin = useCallback<SubmitHandler<LoginFormInput>>(
    async (data) => {
      setIsUnderSubmit(true)
      try {
        const loginRequestResponse = await axios.post(`/auth/login`, { email: data.email, password: data.password })
        if (loginRequestResponse.status === 200) {
          navigate('/')
          setAuth({ userToken: loginRequestResponse.data.token, email: data.email })
          setTheme(SupportedThemes.LIGHT)
          setLanguage(navigator.language)
        }
      } catch (err) {
        console.log(err)
        const error = err as AxiosError
        if (error.request.status === 401) {
          setResponseFeedback({ isShow: true, type: ResponseError.BAD_REQUEST })
        }
        if (error.request.status >= 500) {
          setResponseFeedback({ isShow: true, type: ResponseError.SERVER_ERROR })
        }
      } finally {
        setIsUnderSubmit(false)
      }
    },
    [navigate, setAuth]
  )

  const handleEyeIconClick = useCallback(() => {
    setIsPasswordSeen((prevState) => !prevState)
  }, [])

  const handleInputChange = () => {
    if (responseFeedback?.isShow) {
      setResponseFeedback(undefined)
    }
  }

  return (
    <div>
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.BAD_REQUEST && (
        <UserActionFeedback text={t('errors.loginBadCredentials')} type={SupportedUserActionFeedBackType.ERROR} />
      )}
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.SERVER_ERROR && (
        <UserActionFeedback text={t('errors.unavailableServer')} type={SupportedUserActionFeedBackType.ERROR} />
      )}
      <form onChange={handleInputChange} onSubmit={handleSubmit(handleLogin)} noValidate className="flex flex-col gap-7 w-full">
        <FormInput
          register={register(SupportedInputs.EMAIL, {
            required: true,
            pattern:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
          errors={errors}
          inputType={SupportedInputs.EMAIL}
          labelText={SupportedInputs.EMAIL}
          labelClasses="text-white"
          icon={EnvelopeIcon}
        />
        <div>
          <PasswordInput
            register={register(SupportedInputs.PASSWORD, { required: true })}
            errors={errors}
            handleEyeIconClick={handleEyeIconClick}
            inputType={SupportedInputs.PASSWORD}
            isPasswordSeen={isPasswordSeen}
            labelText={t('inputLabels.password')}
            labelClasses="text-white"
          />
          <div>
            <div className={`flex items-center mt-3 flex-wrap ${errors.password?.type === 'required' ? 'justify-between' : 'justify-end'}`}>
              <Link to="/forgotPassword" className="font-bold text-base sm:text-lg md:text-xl text-primaryGreen hover:text-primaryButtonHover">
                {t('login.forgotPassword')}
              </Link>
            </div>
          </div>
        </div>
        <PrimaryButton text={t('login.loginAction')} icon={ArrowRightIcon} iconPosition="right" underSubmit={isUnderSubmit} type="submit" className="mt-4" />
      </form>
    </div>
  )
}

export default LoginForm
