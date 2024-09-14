interface WidgetContainerProps {
  children: JSX.Element
  className?: string
}

const WidgetContainer: React.FunctionComponent<WidgetContainerProps> = ({ children, className }) => {
  return <div className={`bg-white h-72 px-3 md:px-4 rounded-md shadow-[0px_4px_4px_0px_#00000025] dark:bg-darkTopBar ${className}`}>{children}</div>
}

export default WidgetContainer
