import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useRef, useState } from 'react'
import { IconComponentType, ModalFormInput, SupportedInputs } from '../../../interfaces'
import { useTranslation } from 'react-i18next'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import InputError from '../Errors/InputError'

interface DropdownOption {
  label: string
  image?: string
  imagePosition?: 'right' | 'left'
  [key: string]: unknown
}

interface DropdownProps {
  options: DropdownOption[]
  onChange?: (option: DropdownOption) => void
  defaultValue?: DropdownOption['label']
  DropDownIcon?: IconComponentType
  control?: Control<ModalFormInput>
  errors?: FieldErrors
  name?: SupportedInputs
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({ options, onChange, defaultValue, DropDownIcon = ChevronDownIcon, control, errors, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const dropDownsRef = useRef<HTMLDivElement>(null)

  let initValue = null
  if (defaultValue) {
    initValue = options.find((option) => option.label === defaultValue)
  } else {
    initValue = { label: t('modal.defaultDropdownText') }
  }

  const [selectedOption, setSelectedOption] = useState(initValue)

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onChange) {
      onChange(option)
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropDownsRef.current && !dropDownsRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const detectReturnContent = () => {
    if (control) {
      return (
        <Controller
          name={name!}
          control={control}
          defaultValue={selectedOption?.label !== t('modal.defaultDropdownText') ? selectedOption?.label : undefined}
          rules={{
            required: true,
            validate: () => {
              return selectedOption?.label !== t('modal.defaultDropdownText')
            }
          }}
          render={({ field: { onChange } }) => (
            <div className="relative" ref={dropDownsRef}>
              <div
                className="flex items-center bg-white rounded-md border border-primaryDarkGray p-2 md:p-3 justify-between cursor-pointer dark:bg-darkInputBg dark:border-white dark:placeholder:text-white dark:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center">
                  {selectedOption?.image && selectedOption.imagePosition === 'left' && <img src={selectedOption!.image} className="w-6 h-6 mr-2" alt="" />}
                  <p className="text-base">{selectedOption!.label}</p>
                  {selectedOption?.image && selectedOption.imagePosition === 'right' && <img src={selectedOption!.image} className="w-6 h-6 ml-2" alt="" />}
                </div>
                <DropDownIcon className="w-6 h-6 text-primaryDarkGray" />
              </div>
              {isOpen && (
                <div className="max-h-40 overflow-y-scroll absolute z-30 w-full">
                  {options.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center bg-white p-3 cursor-pointer hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark dark:bg-darkInputBg dark:border-white dark:placeholder:text-white dark:text-white"
                        onClick={() => {
                          handleSelect(option)
                          onChange(option.label)
                        }}
                      >
                        {option?.image && option.imagePosition === 'left' && <img src={option!.image} className="w-6 h-6 mr-2" alt="" />}
                        <p className="text-lg font-secondaryFont">{option.label}</p>
                        {option?.image && option.imagePosition === 'right' && <img src={option!.image} className="w-6 h-6 ml-2" alt="" />}
                      </div>
                    )
                  })}
                </div>
              )}
              <InputError inputType={name!} errors={errors!} />
            </div>
          )}
        />
      )
    }
    return (
      <div ref={dropDownsRef}>
        <div
          className="flex items-center bg-white rounded-md border border-primaryDarkGray p-2 md:p-3 justify-between cursor-pointer dark:bg-darkInputBg dark:border-white dark:placeholder:text-white dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            {selectedOption?.image && selectedOption.imagePosition === 'left' && <img src={selectedOption!.image} className="w-6 h-6 mr-2" alt="" />}
            <p className="text-base">{selectedOption!.label}</p>
            {selectedOption?.image && selectedOption.imagePosition === 'right' && <img src={selectedOption!.image} className="w-6 h-6 ml-2" alt="" />}
          </div>
          <DropDownIcon className="w-6 h-6 text-primaryDarkGray" />
        </div>
        <div>
          {isOpen && (
            <div>
              {options.map((option, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center bg-white p-3 max-w-96 cursor-pointer hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark dark:bg-darkInputBg dark:border-white dark:placeholder:text-white dark:text-white"
                    onClick={() => {
                      handleSelect(option)
                    }}
                  >
                    {option?.image && option.imagePosition === 'left' && <img src={option!.image} className="w-6 h-6 mr-2" alt="" />}
                    <p className="text-lg font-secondaryFont">{option.label}</p>
                    {option?.image && option.imagePosition === 'right' && <img src={option!.image} className="w-6 h-6 ml-2" alt="" />}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  return detectReturnContent()
}

export default Dropdown
