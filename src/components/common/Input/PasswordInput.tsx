import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import Label from '../Label'
import { SupportedInputs } from '../../../interfaces'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'
import InputError from '../Errors/InputError'

interface PasswordInputProps {
  register: UseFormRegisterReturn<SupportedInputs>
  errors: FieldErrors
  inputType: SupportedInputs.PASSWORD | SupportedInputs.PASSWORD_CONFIRM
  isPasswordSeen: boolean
  labelText: string
  labelClasses?: string
  inputClasses?: string
  handleEyeIconClick: () => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  errors,
  inputType,
  labelText,
  labelClasses,
  inputClasses,
  isPasswordSeen,
  handleEyeIconClick
}) => {
  return (
    <div>
      <Label guide={inputType === SupportedInputs.PASSWORD ? 'password' : 'confirmPassword'} text={labelText} className={labelClasses} />
      <div className="relative w-full">
        <input
          type={isPasswordSeen ? 'text' : 'password'}
          id={inputType === SupportedInputs.PASSWORD ? 'password' : 'confirmPassword'}
          className={`w-full px-9 md:px-10 py-2.5 md:py-3 rounded-md ${inputClasses}`}
          {...register}
        />

        <LockClosedIcon className="w-5 md:w-6 absolute left-2.5 top-1/2 transform -translate-y-1/2 stroke-2" />
        {isPasswordSeen ? (
          <EyeSlashIcon
            className="w-[26px] md:w-7 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primaryGreen"
            onClick={handleEyeIconClick}
          />
        ) : (
          <EyeIcon
            className="w-[26px] md:w-7 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primaryGreen"
            onClick={handleEyeIconClick}
          />
        )}
      </div>
      <InputError inputType={inputType} errors={errors} />
    </div>
  )
}

export default PasswordInput
