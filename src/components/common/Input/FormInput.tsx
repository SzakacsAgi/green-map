import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import Label from '../Label'
import InputError from '../Errors/InputError'
import { IconComponentType, SupportedInputs } from '../../../interfaces'

interface FormInputProps {
  register: UseFormRegisterReturn<SupportedInputs>
  errors: FieldErrors
  inputType: SupportedInputs
  labelText: string
  labelClasses?: string
  inputClasses?: string
  icon?: IconComponentType
}

const FormInput: React.FC<FormInputProps> = ({ register, errors, inputType, labelText, labelClasses, inputClasses, icon: Icon }) => {
  return (
    <div>
      <Label guide={inputType} text={labelText} className={labelClasses} />
      <div className="relative">
        <input
          className={`w-full py-2.5 md:py-3 rounded-md dark:bg-darkInputBg dark:border-white dark:text-white ${Icon ? 'px-9  md:px-10' : 'px-3'} ${inputClasses}`}
          type={inputType}
          id={inputType}
          {...register}
        />
        {Icon && <Icon className="w-5 md:w-6 absolute left-2.5 top-1/2 transform -translate-y-1/2 stroke-2" />}
      </div>
      <InputError inputType={inputType} errors={errors} />
    </div>
  )
}

export default FormInput
