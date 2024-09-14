import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { usePasswordValidation } from '../../hooks/usePasswordValidation'
import { useTranslation } from 'react-i18next'

interface PasswordCriteriaProps {
  password: string
}

const PasswordCriteria: React.FunctionComponent<PasswordCriteriaProps> = ({ password }) => {
  const { isLongEnough, isLowerCaseCharacter, isUppercaseCaseCharacter, isSpecialCharacter, isNumberCharacter } = usePasswordValidation()
  const { t } = useTranslation()
  return (
    <div className="flex gap-x-10 flex-col sm:flex-row">
      <div>
        <div className="flex">
          {isLongEnough(password) ? <CheckIcon className="text-primaryGreen w-7" /> : <XMarkIcon className="text-white w-7" />}
          <p className={`ml-1 text-base sm:text-lg md:text-xl ${isLongEnough(password) ? 'text-primaryGreen' : 'text-white'}`}>
            {t('registration.minCharacter')}
          </p>
        </div>
        <div className="flex">
          {isLowerCaseCharacter(password) ? <CheckIcon className="text-primaryGreen w-7" /> : <XMarkIcon className="text-white w-7" />}
          <p className={`ml-1 text-base sm:text-lg md:text-xl ${isLowerCaseCharacter(password) ? 'text-primaryGreen' : 'text-white'}`}>
            {t('registration.lowerCaseRule')}
          </p>
        </div>
        <div className="flex">
          {isUppercaseCaseCharacter(password) ? <CheckIcon className="text-primaryGreen w-7" /> : <XMarkIcon className="text-white w-7" />}
          <p className={`ml-1 text-base sm:text-lg md:text-xl ${isUppercaseCaseCharacter(password) ? 'text-primaryGreen' : 'text-white'}`}>
            {t('registration.upperCaseRule')}
          </p>
        </div>
      </div>
      <div>
        <div className="flex">
          {isSpecialCharacter(password) ? <CheckIcon className="text-primaryGreen w-7" /> : <XMarkIcon className="text-white w-7" />}
          <p className={`ml-1 text-base sm:text-lg md:text-xl ${isSpecialCharacter(password) ? 'text-primaryGreen' : 'text-white'}`}>
            {t('registration.specialCharacterRule')}
          </p>
        </div>
        <div className="flex">
          {isNumberCharacter(password) ? <CheckIcon className="text-primaryGreen w-7" /> : <XMarkIcon className="text-white w-7" />}
          <p className={`ml-1 text-base sm:text-lg md:text-xl ${isNumberCharacter(password) ? 'text-primaryGreen' : 'text-white'}`}>
            {t('registration.numberRule')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PasswordCriteria
