import { HomeIcon, MapPinIcon, Cog6ToothIcon, UserIcon, PlusIcon } from '@heroicons/react/24/outline'
import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { ModalState, ModalTypes } from '../../interfaces'
import Modal from '../common/Modal/Modal'
import { usePoiOperations } from '../../hooks/usePoiOperations'

interface MobileNavigationProps {
  refreshData: () => void
}

const MobileNavigation: FunctionComponent<MobileNavigationProps> = ({ refreshData }) => {
  const { t } = useTranslation()
  const [modalState, setModalState] = useState<ModalState>({ opened: false, data: null, type: ModalTypes.CREATE_POI })
  const { createPoi } = usePoiOperations({ refreshData, setModalState })

  const handelPlusButtonClick = () => {
    setModalState((prevState) => ({ ...prevState, opened: true }))
  }

  return (
    <div>
      <div className="lg:hidden relative bg-white w-[calc(100%-2rem)] h-20 m-auto left-0 right-0 shadow-[0_4px_4px_rgb(0,0,0,0.25)] z-[9999999] rounded-md flex items-center md:px-10 dark:bg-darkNavBg font-primaryFont">
        <nav className="flex w-full sm:px-3">
          <NavLink
            onClick={handelPlusButtonClick}
            to="#"
            className={({ isActive }) =>
              isActive
                ? 'absolute bg-primaryGreen w-16 h-16 flex items-center justify-center rounded-full right-0 left-0 mx-auto bottom-1 -translate-y-1/2 border-2 border-white shadow-[0_4px_4px_rgb(0,0,0,0.25)] hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark'
                : 'absolute bg-primaryGreen w-16 h-16 flex items-center justify-center rounded-full right-0 left-0 mx-auto bottom-1 -translate-y-1/2 border-2 border-white shadow-[0_4px_4px_rgb(0,0,0,0.25)] hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark'
            }
          >
            <PlusIcon className={`w-10 h-10 stroke-2 text-white`} />
          </NavLink>
          <div className="flex justify-around w-1/2 pr-8 sm:pr-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-primaryGreen flex flex-col justify-end items-center dark:text-primaryGreen'
                  : 'flex flex-col items-center dark:text-white justify-end hover:text-primaryButtonHover dark:hover:text-primaryButtonHoverDark'
              }
            >
              <HomeIcon className="w-7 h-7 stroke-2" />
              <p className="font-bold">{t('menuPoints.mobile.home')}</p>
            </NavLink>
            <NavLink
              to="/administration"
              className={({ isActive }) =>
                isActive
                  ? 'text-primaryGreen flex flex-col items-center dark:text-primaryGreen'
                  : 'flex flex-col items-center dark:text-white hover:text-primaryButtonHover dark:hover:text-primaryButtonHoverDark'
              }
            >
              <Cog6ToothIcon className="w-8 h-8 stroke-2" />
              <p className="font-bold">{t('menuPoints.mobile.administration')}</p>
            </NavLink>
          </div>
          <div className="flex justify-around w-1/2 pl-8">
            <NavLink
              to="/map"
              className={({ isActive }) =>
                isActive
                  ? 'text-primaryGreen flex flex-col items-center dark:text-primaryGreen'
                  : 'flex flex-col items-center dark:text-white hover:text-primaryButtonHover dark:hover:text-primaryButtonHoverDark'
              }
            >
              <MapPinIcon className="w-8 h-8 stroke-2" />
              <p className="font-bold">{t('menuPoints.mobile.map')}</p>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? 'text-primaryGreen flex flex-col justify-end items-center dark:text-primaryGreen '
                  : 'flex flex-col items-center dark:text-white justify-end hover:text-primaryButtonHover dark:hover:text-primaryButtonHoverDark'
              }
            >
              <UserIcon className="w-7 h-7 stroke-2" />
              <p className="font-bold">{t('menuPoints.mobile.profile')}</p>
            </NavLink>
          </div>
        </nav>
      </div>
      {modalState.opened && (
        <Modal
          modalInfo={{ data: modalState.data, opened: modalState.opened, type: modalState.type }}
          onSubmit={createPoi}
          setModalState={() => {
            setModalState({ ...modalState, opened: false })
          }}
        />
      )}
    </div>
  )
}

export default MobileNavigation
