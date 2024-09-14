import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, MapPinIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import DesktopProfileMenupoint from './DesktopProfileMenuPoint'

interface NavigationProps {
  opened: boolean
}

const Navigation: FunctionComponent<NavigationProps> = ({ opened }) => {
  const { t } = useTranslation()

  return (
    <div className="pt-24 font-primaryFont">
      <div className="flex justify-center">
        <img src="/assets/logo.png" alt="Green map logo" className={`${opened ? 'w-28' : 'w-12'}`} />
      </div>
      <DesktopProfileMenupoint />
      <div className={`my-5 ${opened ? 'px-5' : 'px-3'}`}>
        <div className="h-0.5 bg-white" />
      </div>
      <nav className="flex flex-col text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'bg-primaryGreen font-bold text-xl px-5 w-full py-6'
              : 'font-bold text-xl px-5 py-6 hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark'
          }
        >
          <span className={`flex gap-1 items-center ${!opened ? 'justify-center' : ''}`}>
            <HomeIcon className={`w-7 h-7 stroke-2 ${!opened ? 'w-9 h-9' : ''}`} />
            {opened && <p className="ml-1">{t('menuPoints.desktop.dashboard')}</p>}
          </span>
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive
              ? 'bg-primaryGreen font-bold text-xl px-5 w-full py-6'
              : 'font-bold text-xl px-5 py-6 hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark'
          }
        >
          <span className={`flex gap-1 items-center ${!opened ? 'justify-center' : ''}`}>
            <MapPinIcon className={`w-7 h-7 stroke-2 ${!opened ? 'w-9 h-9' : ''}`} />
            {opened && <p className="ml-1">{t('menuPoints.desktop.map')}</p>}
          </span>
        </NavLink>
        <NavLink
          to="/administration"
          className={({ isActive }) =>
            isActive
              ? 'bg-primaryGreen font-bold text-xl px-5 w-full py-6'
              : 'font-bold text-xl px-5 py-6 hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark'
          }
        >
          <span className={`flex gap-1 items-center ${!opened ? 'justify-center' : ''}`}>
            <Cog6ToothIcon className={`w-7 h-7 stroke-2 ${!opened ? 'w-9 h-9' : ''}`} />
            {opened && <p className="ml-1">{t('menuPoints.desktop.administration')}</p>}
          </span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Navigation
