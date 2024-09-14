import { IconComponentType } from '../../../interfaces'
import Spinner from '../../svg/Spinner'

interface PrimaryButtonProps {
  type?: 'submit' | 'reset' | 'button'
  icon?: IconComponentType
  iconPosition?: 'right' | 'left'
  underSubmit?: boolean
  text: string
  onClick?: () => void
  className?: string
}

const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = ({ type, icon: Icon, iconPosition, underSubmit, text, onClick, className, ...props }) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center font-primaryFont font-bold px-8 py-2.5 md:px-12 md:py-3 text-white text-xl bg-primaryGreen rounded-md hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark disabled:hover:bg-primaryGreen ${className}`}
      onClick={onClick}
      {...props}
    >
      {!Icon && text}
      {iconPosition === 'right' && !underSubmit ? text : ''}
      {underSubmit ? <Spinner /> : Icon && <Icon className={`w-7 ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`} />}
      {iconPosition === 'left' && !underSubmit ? <p className="text-lg md:text-xl">{text}</p> : ''}
    </button>
  )
}

export default PrimaryButton
