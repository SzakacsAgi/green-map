import PasswordInput from '../common/Input/PasswordInput'
import PrimaryButton from '../common/Button/PrimaryButton'
import { ArrowRightIcon } from '@heroicons/react/16/solid'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationFormInput, ResponseError, ResponsesType, ResponseSuccess, SupportedInputs, SupportedUserActionFeedBackType } from '../../interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import UserActionFeedback from '../common/Errors/UserActionFeedback'
import PasswordCriteria from '../registration/PasswordCriteria'

const ResetPasswordForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegistrationFormInput>()
  const { resetPasswordToken } = useParams<{ resetPasswordToken: string }>()

  const [isUnderSubmit, setIsUnderSubmit] = useState(false)
  const [isPasswordSeen, setIsPasswordSeen] = useState({ password: false, confirm: false })
  const [responseFeedback, setResponseFeedback] = useState<ResponsesType>()

  const handelForgotPassword = useCallback<SubmitHandler<RegistrationFormInput>>(
    async (data) => {
      setIsUnderSubmit(true)
      try {
        const resetPasswordResponse = await axios.post(`/auth/reset-password?token=${resetPasswordToken}`, {
          password: data.password
        })
        if (resetPasswordResponse.status === 200) {
          setResponseFeedback({ isShow: true, type: ResponseSuccess.POSITIVE_FEEDBACK })
        }
      } catch (err) {
        console.log(err)
        const error = err as AxiosError
        if (error.request.status === 400 || error.request.status === 404) {
          setResponseFeedback({ isShow: true, type: ResponseError.SERVER_ERROR })
        }
        if (error.request.status >= 500) {
          setResponseFeedback({ isShow: true, type: ResponseError.SERVER_ERROR })
        }
      } finally {
        setIsUnderSubmit(false)
      }
    },
    [navigate]
  )

  const handelEyeIconClick = useCallback((passwordFieldName: 'password' | 'confirm') => {
    setIsPasswordSeen((prevState) => ({ ...prevState, [passwordFieldName]: !prevState[passwordFieldName] }))
  }, [])

  return (
    <div>
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseSuccess.POSITIVE_FEEDBACK && (
        <UserActionFeedback text={t('userFeedback.successfulPasswordChange')} type={SupportedUserActionFeedBackType.POSITIVE_FEEDBACK} />
      )}
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.SERVER_ERROR && (
        <UserActionFeedback text={t('errors.unavailableServer')} type={SupportedUserActionFeedBackType.ERROR} />
      )}
      <form onSubmit={handleSubmit(handelForgotPassword)} noValidate className="flex flex-col w-full gap-8 sm:max-w-1/2">
        <div className="flex flex-col gap-8 2xl:gap-12">
          <PasswordInput
            register={register(SupportedInputs.PASSWORD, { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[0-9]).{8,}$/ })}
            errors={errors}
            handleEyeIconClick={() => handelEyeIconClick('password')}
            inputType={SupportedInputs.PASSWORD}
            isPasswordSeen={isPasswordSeen.password}
            labelText={t('inputLabels.password')}
            labelClasses="text-white"
          />
          <PasswordInput
            register={register(SupportedInputs.PASSWORD_CONFIRM, {
              required: true,
              validate: (value) => {
                return value === watch('password') || t('errors.passwordMissMatch')
              }
            })}
            errors={errors}
            handleEyeIconClick={() => handelEyeIconClick('confirm')}
            inputType={SupportedInputs.PASSWORD_CONFIRM}
            isPasswordSeen={isPasswordSeen.confirm}
            labelText={t('inputLabels.confirmPassword')}
            labelClasses="text-white"
          />
        </div>
        <PasswordCriteria password={watch('password')} />
        <div className="flex flex-col gap-x-10 lg:gap-x-16">
          <PrimaryButton text={t('forgotPassword.reset')} icon={ArrowRightIcon} iconPosition="right" underSubmit={isUnderSubmit} className="mb-1" />
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordForm
