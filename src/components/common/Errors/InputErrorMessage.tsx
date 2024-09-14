interface InputErrorMessageProps {
  message: string
}

const InputErrorMessage: React.FunctionComponent<InputErrorMessageProps> = ({ message }) => {
  return <p className="text-red-500 mt-1">{message}</p>
}

export default InputErrorMessage
