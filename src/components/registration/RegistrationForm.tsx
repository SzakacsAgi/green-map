import { FormEvent, useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ArrowRightIcon } from '@heroicons/react/16/solid'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { ResponseError, ResponsesType, ResponseSuccess, SupportedInputs, SupportedUserActionFeedBackType, type RegistrationFormInput } from '../../interfaces'
import { useTranslation } from 'react-i18next'
import FormInput from '../common/Input/FormInput'
import PasswordInput from '../common/Input/PasswordInput'
import PrimaryButton from '../common/Button/PrimaryButton'
import axios, { AxiosError } from 'axios'
import UserActionFeedback from '../common/Errors/UserActionFeedback'
import PasswordCriteria from './PasswordCriteria'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegistrationFormInput>()

  const [isUnderSubmit, setIsUnderSubmit] = useState(false)
  const [isPasswordSeen, setIsPasswordSeen] = useState({ password: false, confirm: false })
  const [responseFeedback, setResponseFeedback] = useState<ResponsesType>()
  const { t } = useTranslation()

  const handelRegistration = useCallback<SubmitHandler<RegistrationFormInput>>(
    async (data) => {
      setIsUnderSubmit(true)
      try {
        const registrationRequestResponse = await axios.post(`/auth/register`, { email: data.email, password: data.password })
        if (registrationRequestResponse.status === 200) {
          setResponseFeedback({ isShow: true, type: ResponseSuccess.POSITIVE_FEEDBACK })
        }
      } catch (err) {
        console.log(err)
        const error = err as AxiosError
        if (error.request.status === 403) {
          setResponseFeedback({ isShow: true, type: ResponseError.BAD_REQUEST })
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

  const handleInputChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as Element
    if (target instanceof HTMLInputElement && target.name === 'email') {
      if (responseFeedback?.isShow) {
        setResponseFeedback(undefined)
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-x-10 lg:gap-x-16 sm:flex-row">
        <div className="sm:w-1/2">
          {responseFeedback?.isShow === true && responseFeedback.type === ResponseSuccess.POSITIVE_FEEDBACK && (
            <UserActionFeedback text={t('userFeedback.successfulRegistration')} type={SupportedUserActionFeedBackType.POSITIVE_FEEDBACK} />
          )}
          {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.BAD_REQUEST && (
            <UserActionFeedback text={t('errors.registrationBadCredentials')} type={SupportedUserActionFeedBackType.ERROR} />
          )}
        </div>
        <div className="w-1/2" />
      </div>
      <div className="flex flex-col gap-x-10 lg:gap-x-16 sm:flex-row">
        <div className="sm:w-1/2">
          {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.SERVER_ERROR && (
            <UserActionFeedback text={t('errors.unavailableServer')} type={SupportedUserActionFeedBackType.ERROR} />
          )}
        </div>
        <div className="w-1/2" />
      </div>
      <form onChange={handleInputChange} onSubmit={handleSubmit(handelRegistration)} noValidate className="flex flex-col w-full gap-7">
        <div className="flex flex-col gap-10 lg:gap-16 sm:flex-row">
          <div className="sm:w-1/2">
            <FormInput
              register={{
                ...register(SupportedInputs.FIRST_NAME, {
                  required: true
                })
              }}
              errors={errors}
              inputType={SupportedInputs.FIRST_NAME}
              labelText={t('inputLabels.firstName')}
              labelClasses="text-white"
            />
          </div>
          <div className="sm:w-1/2">
            <FormInput
              register={{
                ...register(SupportedInputs.LAST_NAME, {
                  required: true
                })
              }}
              errors={errors}
              inputType={SupportedInputs.LAST_NAME}
              labelText={t('inputLabels.lastName')}
              labelClasses="text-white"
            />
          </div>
        </div>
        <div className="flex flex-col gap-x-10 lg:gap-x-16 sm:flex-row">
          <div className="sm:w-1/2">
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
          </div>
          <div className="w-1/2" />
        </div>
        <div className="flex flex-col gap-10 lg:gap-16 sm:flex-row">
          <div className="sm:w-1/2">
            <PasswordInput
              register={register(SupportedInputs.PASSWORD, {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[0-9]).{8,}$/
              })}
              errors={errors}
              handleEyeIconClick={() => handelEyeIconClick('password')}
              inputType={SupportedInputs.PASSWORD}
              isPasswordSeen={isPasswordSeen.password}
              labelText={t('inputLabels.password')}
              labelClasses="text-white"
            />
          </div>
          <div className="sm:w-1/2">
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
        </div>
        <PasswordCriteria password={watch('password')} />
        <div className="flex flex-col gap-x-10 lg:gap-x-16 sm:flex-row">
          <div className="sm:w-1/2">
            <PrimaryButton
              text={t('registration.registrationAction')}
              icon={ArrowRightIcon}
              iconPosition="right"
              underSubmit={isUnderSubmit}
              className="w-full 2xl:my-2.5"
            />
          </div>
          <div className="w-1/2" />
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
