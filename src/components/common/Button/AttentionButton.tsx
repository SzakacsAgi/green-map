import { IconComponentType } from '../../../interfaces'
import Spinner from '../../svg/Spinner'

interface AttentionButtonProps {
  type?: 'submit' | 'reset' | 'button'
  icon?: IconComponentType
  iconPosition?: 'right' | 'left'
  underSubmit?: boolean
  text: string
  onClick?: () => void
  className?: string
  iconClass?: string
}

const AttentionButton: React.FunctionComponent<AttentionButtonProps> = ({
  type,
  icon: Icon,
  iconPosition,
  underSubmit,
  text,
  onClick,
  className,
  iconClass
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center font-bold font-primaryFont px-8 py-2 border-2 border-transparent md:px-12 md:py-3 bg-darkRed text-white text-xl rounded-md dark:text-white hover:bg-deletePointHoverBg hover:rounded-lg hover:border-middleRed hover:text-darkRed ${className}`}
      onClick={onClick}
    >
      {!Icon && text}
      {iconPosition === 'right' && !underSubmit ? text : ''}
      {underSubmit ? <Spinner /> : Icon && <Icon className={`w-6 md:w-7 ${iconPosition === 'right' ? 'ml-2' : 'mr-2'} ${iconClass}`} />}
      {iconPosition === 'left' && !underSubmit ? <p className="text-lg md:text-xl">{text}</p> : ''}
    </button>
  )
}

export default AttentionButton
