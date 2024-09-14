import PrimaryButton from '../common/Button/PrimaryButton'
import { ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationFormInput, ResponseError, ResponsesType, ResponseSuccess, SupportedInputs, SupportedUserActionFeedBackType } from '../../interfaces'
import FormInput from '../common/Input/FormInput'
import { t } from 'i18next'
import axios, { AxiosError } from 'axios'
import UserActionFeedback from '../common/Errors/UserActionFeedback'

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrationFormInput>()

  const [isUnderSubmit, setIsUnderSubmit] = useState(false)
  const [responseFeedback, setResponseFeedback] = useState<ResponsesType>()

  const handelForgotPassword = useCallback<SubmitHandler<RegistrationFormInput>>(async (data) => {
    setIsUnderSubmit(true)

    try {
      const forgotPasswordResponse = await axios.post(`/auth/reset-password-request`, { email: data.email })
      if (forgotPasswordResponse.status === 200) {
        setResponseFeedback({ isShow: true, type: ResponseSuccess.POSITIVE_FEEDBACK })
      }
    } catch (err) {
      console.log(err)
      const error = err as AxiosError
      if (error.request.status === 400 || error.request.status === 404) {
        setResponseFeedback({ isShow: true, type: ResponseError.BAD_REQUEST })
      }
      if (error.request.status >= 500) {
        setResponseFeedback({ isShow: true, type: ResponseError.SERVER_ERROR })
      }
    } finally {
      setIsUnderSubmit(false)
    }
  }, [])

  const handleInputChange = () => {
    if (responseFeedback?.isShow) {
      setResponseFeedback(undefined)
    }
  }

  return (
    <div>
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseSuccess.POSITIVE_FEEDBACK && (
        <UserActionFeedback text={t('userFeedback.successfulResetPasswordRequest')} type={SupportedUserActionFeedBackType.POSITIVE_FEEDBACK} />
      )}
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.BAD_REQUEST && (
        <UserActionFeedback text={t('errors.resetPassWordBadCredentials')} type={SupportedUserActionFeedBackType.ERROR} />
      )}
      {responseFeedback?.isShow === true && responseFeedback.type === ResponseError.SERVER_ERROR && (
        <UserActionFeedback text={t('errors.unavailableServer')} type={SupportedUserActionFeedBackType.ERROR} />
      )}
      <form onChange={handleInputChange} onSubmit={handleSubmit(handelForgotPassword)} noValidate className="flex flex-col w-full gap-8 sm:max-w-1/2">
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
        <div className="flex flex-col gap-x-10 lg:gap-x-16">
          <PrimaryButton text={t('pagination.next')} icon={ArrowRightIcon} underSubmit={isUnderSubmit} iconPosition="right" className="mb-2" />
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordForm
