import { useTranslation } from 'react-i18next'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../../utils/atoms'
import { ModalFormInput, SupportedLanguages, SupportedThemes } from '../../../interfaces'
import { Control, Controller, FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import Label from '../Label'
import InputError from '../Errors/InputError'
import { SupportedInputs } from '../../../interfaces'
import { PhoneNumberUtil } from 'google-libphonenumber'

interface PhoneNumberInputProps {
  control?: Control<ModalFormInput>
  register: UseFormRegisterReturn<SupportedInputs>
  errors: FieldErrors
  labelText: string
  labelClasses?: string
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ errors, labelText, labelClasses, control }) => {
  const { i18n } = useTranslation()
  const theme = useRecoilValue(themeState)
  const phoneUtil = PhoneNumberUtil.getInstance()

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
    } catch (error) {
      return false
    }
  }

  return (
    <div>
      <Label text={labelText} className={labelClasses} />
      <Controller
        name={SupportedInputs.PHONE_NUMBER}
        control={control}
        rules={{
          required: true,
          validate: (value) => {
            return isPhoneValid(value)
          }
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            defaultCountry={i18n.language === SupportedLanguages.ENGLISH ? 'us' : 'hu'}
            value={value}
            onChange={onChange}
            inputStyle={{
              backgroundColor: `${theme === SupportedThemes.DARK ? '#9aa0a6' : 'white'}`,
              fontSize: 'large',
              color: `${theme === SupportedThemes.DARK ? 'white' : 'black'}`,
              height: '47px',
              border: `1px solid ${theme === SupportedThemes.DARK ? 'white' : 'black'}`,
              width: '100%'
            }}
            countrySelectorStyleProps={{
              buttonStyle: {
                backgroundColor: `${theme === SupportedThemes.DARK ? '#9aa0a6' : 'white'}`,
                border: `1px solid ${theme === SupportedThemes.DARK ? 'white' : 'black'}`,
                borderRight: `1px solid ${theme === SupportedThemes.DARK ? 'white' : 'black'}`,
                height: '47px'
              },
              flagStyle: { width: '36px', height: '30px', borderRadius: 'unset' }
            }}
          />
        )}
      />
      <InputError inputType={SupportedInputs.PHONE_NUMBER} errors={errors} />
    </div>
  )
}

export default PhoneNumberInput
