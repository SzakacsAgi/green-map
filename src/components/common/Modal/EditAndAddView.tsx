import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PoiData, ModalFormInput, SupportedInputs } from '../../../interfaces'
import { useTranslation } from 'react-i18next'
import FormInput from '../Input/FormInput'
import SecondaryButton from '../Button/SecondaryButton'
import PrimaryButton from '../Button/PrimaryButton'
import PhoneNumberInput from '../Input/PhoneNumberInput'
import { XMarkIcon, ClockIcon } from '@heroicons/react/16/solid'
import Label from '../Label'
import Dropdown from '../Input/Dropdown'

interface ModalFormProps {
  data?: PoiData | null
  onClose: () => void
  onSubmit: (data: PoiData) => void
}

const EditAndAddView: React.FunctionComponent<ModalFormProps> = ({ onClose, data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ModalFormInput>()

  const [isUnderSubmit, setIsUnderSubmit] = useState(false)
  const { t } = useTranslation()

  const handleOnSubmit: SubmitHandler<ModalFormInput> = useCallback(
    async (formData) => {
      setIsUnderSubmit(true)
      try {
        if (data) {
          onSubmit({ ...formData, longitude: parseFloat(formData.longitude), latitude: parseFloat(formData.latitude), id: data.id })
        } else {
          onSubmit({ ...formData, longitude: parseFloat(formData.longitude), latitude: parseFloat(formData.latitude), id: 'null' })
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsUnderSubmit(false)
      }
    },
    [onSubmit]
  )

  const categories = [
    'Restaurants & Cafés',
    'Retail & Shopping',
    'Entertainment & Leisure',
    'Health & Wellness',
    'Cultural & Historical Sites',
    'Business & Services'
  ]

  const hoursList = []
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0')
    hoursList.push(`${hour}:00`)
    hoursList.push(`${hour}:30`)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} noValidate className="flex flex-col gap-y-4 w-full md:py-7 md:px-10 relative">
      <XMarkIcon className="sm:hidden w-10 h-10 absolute right-0 -top-1 cursor-pointer dark:text-white hover:text-primaryGreen" onClick={onClose} />
      <h2 className="text-primaryDarkGray text-2xl md:text-3xl font-bold font-primaryFont mb-3 dark:text-white">
        {data ? t('buttonText.edit') : t('buttonText.addNew')}
      </h2>
      <div className="flex flex-col gap-7 lg:flex-row">
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.POI_NAME, {
              required: true,
              value: data ? data.name : ''
            })}
            errors={errors}
            inputType={SupportedInputs.POI_NAME}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.name')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
        <div className="hidden w-1/2 lg:block" />
      </div>
      <div className="flex flex-col gap-7 lg:flex-row">
        <div className="lg:w-1/2">
          <Label text={t('inputLabels.category')} className="text-primaryDarkGray" />
          <Dropdown
            options={categories.map((category) => ({ label: category }))}
            control={control}
            errors={errors}
            name={SupportedInputs.CATEGORY}
            defaultValue={data ? data.category : ''}
          />
        </div>
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.SUBCATEGORY, {
              required: true,
              value: data ? data.subCategory : ''
            })}
            errors={errors}
            inputType={SupportedInputs.SUBCATEGORY}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.subcategory')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7 lg:flex-row">
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.DESCRIPTION, {
              required: true,
              value: data ? data.description : ''
            })}
            errors={errors}
            inputType={SupportedInputs.DESCRIPTION}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.description')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.URL, {
              required: true,
              value: data ? data.url : ''
            })}
            errors={errors}
            inputType={SupportedInputs.URL}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.url')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7 lg:flex-row">
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.EMAIL, {
              required: true,
              pattern:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              value: data ? data.email : ''
            })}
            errors={errors}
            inputType={SupportedInputs.EMAIL}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.email')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
        <div className="lg:w-1/2">
          <PhoneNumberInput
            errors={errors}
            labelText={t('inputLabels.phoneNumber')}
            register={register(SupportedInputs.PHONE_NUMBER, {
              required: true,
              value: data ? data.phoneNumber : ''
            })}
            control={control}
            labelClasses="text-primaryDarkGray"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7 lg:flex-row">
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.ADDRESS, {
              required: true,
              value: data ? data.address : ''
            })}
            errors={errors}
            inputType={SupportedInputs.ADDRESS}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.address')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
        <div className="lg:w-1/2">
          <Label text={t('inputLabels.openingHours')} className="text-primaryDarkGray" />
          <div className="flex justify-between relative">
            <div className="w-[45%]">
              <Dropdown
                options={hoursList.map((hour) => ({ label: hour }))}
                DropDownIcon={ClockIcon}
                control={control}
                errors={errors}
                defaultValue={data ? data.openingHours.split('-')[0].trim() : ''}
                name={SupportedInputs.OPENING_TIME}
              />
            </div>
            <div className="w-3.5 h-0.5 bg-darkGray absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="w-[45%]">
              <Dropdown
                options={hoursList.map((hour) => ({ label: hour }))}
                DropDownIcon={ClockIcon}
                control={control}
                errors={errors}
                defaultValue={data ? data.openingHours.split('-')[1].trim() : ''}
                name={SupportedInputs.CLOSING_TIME}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 lg:flex-row">
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.LONGITUDE, {
              required: true,
              pattern: /^-?\d+(\.\d+)?$/,
              value: data ? data.longitude.toString() : ''
            })}
            errors={errors}
            inputType={SupportedInputs.LONGITUDE}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.longitude')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
        <div className="lg:w-1/2">
          <FormInput
            register={register(SupportedInputs.LATITUDE, {
              required: true,
              pattern: /^-?\d+(\.\d+)?$/,
              value: data ? data.latitude.toString() : ''
            })}
            errors={errors}
            inputType={SupportedInputs.LATITUDE}
            inputClasses="border border-primaryDarkGray"
            labelText={t('inputLabels.latitude')}
            labelClasses="text-primaryDarkGray"
          />
        </div>
      </div>
      <div className="847:flex 847:justify-end pb-24 md:pb-20 lg:pb-4">
        <div className="flex mt-6 847:flex-row flex-col-reverse gap-y-3">
          <SecondaryButton text={t('buttonText.cancel')} type="button" onClick={onClose} />
          <PrimaryButton text={data ? t('buttonText.edit') : t('buttonText.addNew')} type="submit" underSubmit={isUnderSubmit} className="mr-0" />
        </div>
      </div>
    </form>
  )
}

export default EditAndAddView
