import { useSetRecoilState } from 'recoil'
import i18n from '../../i18n'
import { SupportedLanguages } from '../../interfaces'
import { selectedLanguage } from '../../utils/atoms'
import Dropdown from '../common/Input/Dropdown'

interface OptionType {
  code: SupportedLanguages
  label: string
  image: string
  imagePosition: 'left' | 'right'
}

interface LanguageSelectorProps {
  supportedLanguages: OptionType[]
}

const LanguageSelector: React.FunctionComponent<LanguageSelectorProps> = ({ supportedLanguages }) => {
  const setLanguage = useSetRecoilState(selectedLanguage)
  const options = supportedLanguages.map((details: OptionType) => {
    return {
      code: details.code,
      label: details.label,
      image: details.image,
      imagePosition: 'left'
    }
  })

  const handleLanguageSwitch = (selectedOption: OptionType) => {
    i18n.changeLanguage(selectedOption.code)
    setLanguage(selectedOption.code)
  }

  return (
    <Dropdown
      options={options}
      onChange={(selectedOption) => {
        handleLanguageSwitch(selectedOption)
      }}
      defaultValue={options.find((option) => i18n.language.includes(option.code as string))?.label}
    />
  )
}

export { LanguageSelector }
