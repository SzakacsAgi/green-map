import { IconComponentType } from '../../../interfaces'
import Spinner from '../../svg/Spinner'

interface SecondaryButtonProps {
  type?: 'submit' | 'reset' | 'button'
  icon?: IconComponentType
  iconPosition?: 'right' | 'left'
  underSubmit?: boolean
  text: string
  onClick?: () => void
  iconClass?: string
  buttonClass?: string
}

const SecondaryButton: React.FunctionComponent<SecondaryButtonProps> = ({
  type,
  icon: Icon,
  iconPosition,
  underSubmit,
  text,
  onClick,
  iconClass,
  buttonClass,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center font-bold font-primaryFont px-8 py-2 md:px-12 md:py-3 border-2 border-darkGray text-darkGray 847:mr-5 text-xl rounded-md dark:text-white hover:bg-primaryDarkGray hover:border-[#FFFFF0] hover:text-white disabled:hover:bg-none ${buttonClass}`}
      onClick={onClick}
      {...props}
    >
      {!Icon && text}
      {iconPosition === 'right' && !underSubmit ? text : ''}
      {underSubmit ? <Spinner /> : Icon && <Icon className={`w-7 mr-2 ${iconClass}`} />}
      {iconPosition === 'left' && !underSubmit ? text : ''}
    </button>
  )
}

export default SecondaryButton
