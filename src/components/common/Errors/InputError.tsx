import { FieldErrors } from 'react-hook-form'
import { SupportedInputs } from '../../../interfaces'
import InputErrorMessage from './InputErrorMessage'
import { useTranslation } from 'react-i18next'

interface InputErrorProps {
  inputType: SupportedInputs
  errors: FieldErrors
}

const InputError: React.FunctionComponent<InputErrorProps> = ({ inputType, errors }) => {
  const { t } = useTranslation()

  switch (inputType) {
    case SupportedInputs.ADDRESS:
      return errors.address?.type === 'required' && <InputErrorMessage message={t('errors.emptyAddressField')} />
    case SupportedInputs.CATEGORY:
      return errors.category?.type === 'required' && <InputErrorMessage message={t('errors.emptyCategoryField')} />
    case SupportedInputs.DESCRIPTION:
      return errors.description?.type === 'required' && <InputErrorMessage message={t('errors.emptyDescriptionField')} />
    case SupportedInputs.EMAIL:
      return (
        (errors.email?.type === 'required' && <InputErrorMessage message={t('errors.emptyEmailField')} />) ||
        (errors.email?.type === 'pattern' && <InputErrorMessage message={t('errors.invalidEmailFormat')} />)
      )
    case SupportedInputs.LATITUDE:
      return (
        (errors.latitude?.type === 'required' && <InputErrorMessage message={t('errors.emptyLatitudeField')} />) ||
        (errors.latitude?.type === 'pattern' && <InputErrorMessage message={t('errors.invalidLatitude')} />)
      )
    case SupportedInputs.LONGITUDE:
      return (
        (errors.longitude?.type === 'required' && <InputErrorMessage message={t('errors.emptyLongitudeField')} />) ||
        (errors.longitude?.type === 'pattern' && <InputErrorMessage message={t('errors.invalidLongitude')} />)
      )
    case SupportedInputs.POI_NAME:
      return errors.name?.type === 'required' && <InputErrorMessage message={t('errors.emptyPoiNameField')} />
    case SupportedInputs.CLOSING_TIME:
      return errors.closingTime?.type === 'required' && <InputErrorMessage message={t('errors.emptyClosingTimeField')} />
    case SupportedInputs.OPENING_TIME:
      return errors.openingTime?.type === 'required' && <InputErrorMessage message={t('errors.emptyOpeningTimeField')} />
    case SupportedInputs.PHONE_NUMBER:
      return (
        (errors.phoneNumber?.type === 'required' && <InputErrorMessage message={t('errors.emptyPhoneNumberField')} />) ||
        (errors.phoneNumber?.type === 'validate' && <InputErrorMessage message={t('errors.invalidPhoneNumberFormat')} />)
      )
    case SupportedInputs.SUBCATEGORY:
      return errors.subCategory?.type === 'required' && <InputErrorMessage message={t('errors.emptySubcategoryField')} />
    case SupportedInputs.URL:
      return errors.url?.type === 'required' && <InputErrorMessage message={t('errors.emptyURLField')} />
    case SupportedInputs.PASSWORD:
      return errors.password?.type === 'required' && <InputErrorMessage message={t('errors.emptyPasswordField')} />
    case SupportedInputs.PASSWORD_CONFIRM:
      return (
        (errors.passwordConfirm?.type === 'required' && <InputErrorMessage message={t('errors.emptyPasswordField')} />) ||
        (errors.passwordConfirm?.type === 'validate' && <InputErrorMessage message={t('errors.passwordMissMatch')} />)
      )
    case SupportedInputs.FIRST_NAME:
      return errors.firstName?.type === 'required' && <InputErrorMessage message={t('errors.emptyFirstNameField')} />
    case SupportedInputs.LAST_NAME:
      return errors.lastName?.type === 'required' && <InputErrorMessage message={t('errors.emptyLastNameField')} />
  }
}

export default InputError
