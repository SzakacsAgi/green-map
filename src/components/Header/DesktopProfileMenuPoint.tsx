import { useRecoilValue } from 'recoil'
import { authState } from '../../utils/atoms'
import { navbarState } from '../../utils/atoms'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UserIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

const DesktopProfileMenupoint = () => {
  const { email } = useRecoilValue(authState)
  const isNavbarOpened = useRecoilValue(navbarState)
  const logout = useLogout()
  const [isProfileOpened, setIsProfileOpened] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLSpanElement>(null)
  const tooLongEmail = 25

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      e.stopPropagation()
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProfileOpened(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleProfileClick = useCallback(() => {
    setIsProfileOpened((prevState) => !prevState)
  }, [])

  const handleProfileNavigation = () => {
    navigate('/profile')
  }

  return (
    <span
      className={`flex gap-1 items-center relative cursor-pointer ${!isNavbarOpened ? 'justify-center mt-16 mb-0' : 'mt-20 mb-5 justify-center'}`}
      onClick={handleProfileClick}
      ref={menuRef}
    >
      <div className="flex items-center px-7 py-3 hover:bg-primaryButtonHover dark:hover:bg-primaryButtonHoverDark">
        <div className="rounded-full border-2 p-2 bg-middleGray border-white text-primaryDarkGray font-bold text-2xl dark:text-white dark:border-white dark:bg-darkTopBar ">
          {email.slice(0, 2).toUpperCase()}
        </div>
        {isNavbarOpened && <p className="ml-2 text-white uppercase font-bold">{email.length > tooLongEmail ? email.slice(0, email.indexOf('@')) : email}</p>}
      </div>
      {isProfileOpened ? (
        <div className="absolute top-[75px] left-6 border-2 border-darkGray rounded-md bg-white text-darkGray min-w-60 dark:bg-darkInputBg dark:text-white dark:border-black">
          <div className="stroke-2 mx-3 py-3 cursor-default">
            <p className="text-xl">{email.slice(0, email.indexOf('@'))}</p>
            <p className="text-sm font-light">{email}</p>
          </div>
          <hr className="h-0.5 bg-darkGray absolute top-[70px] w-[90%] left-0 right-0 m-auto" />
          <div
            className="mx-3 py-1.5 my-1 cursor-pointer hover:bg-actionPointHoverBg border-2 border-transparent hover:text-primaryDarkGray hover:rounded-lg hover:border-primaryDarkGray"
            onClick={handleProfileNavigation}
          >
            <div className="pl-1 flex items-center ">
              <UserIcon className="w-6 h-6 stroke-2 hover:text-primaryDarkGray" />
              <p className="text-xl ml-1 hover:text-bg-primaryDarkGray">{t('menuPoints.desktop.profile')}</p>
            </div>
          </div>
          <hr className="h-0.5 bg-darkGray absolute bottom-[52.5px] w-[90%] left-0 right-0 m-auto" />
          <div
            className="flex items-center mx-3 py-1.5 my-1 cursor-pointer hover:bg-deletePointHoverBg mt-2 border-2 border-transparent hover:rounded-lg hover:border-middleRed hover:text-darkRed"
            onClick={logout}
          >
            <div className="pl-1 flex items-center ">
              <ArrowUpTrayIcon className="w-6 h-6 stroke-2 rotate-90" />
              <p className="text-xl ml-1">{t('menuPoints.desktop.logout')}</p>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </span>
  )
}

export default DesktopProfileMenupoint
