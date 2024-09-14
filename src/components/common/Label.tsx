interface LabelProps {
  text: string
  guide?: string
  className?: string
}

const Label: React.FC<LabelProps> = ({ text, guide, className }) => (
  <label
    htmlFor={guide}
    className={`${className} inline-block font-bold mb-2 w-fit text-lg font-primaryFont md:text-xl first-letter:uppercase dark:text-darkGray`}
  >
    {text}
  </label>
)

export default Label
