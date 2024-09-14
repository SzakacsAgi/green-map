import { FunctionComponent } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'

interface MenuButtonProp {
  opened: boolean
  handleOpen: () => void
}

const MenuButton: FunctionComponent<MenuButtonProp> = ({ opened, handleOpen }) => {
  return (
    <button
      onClick={handleOpen}
      className="absolute right-0 translate-x-1/2 top-7 w-10 h-10 rounded-full border-4 bg-primaryGreen border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark"
    >
      {opened ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  )
}

export default MenuButton
